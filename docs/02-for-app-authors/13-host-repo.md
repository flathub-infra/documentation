# Self hosting a flatpak repository

Flathub uses [flat-manager](https://github.com/flatpak/flat-manager) and various other tools to host the repository. However, for single applications, you can quickly host a Flatpak repository through Gitlab or Github pages and distribute your app. These methods will rely on [flatpak-github-actions](https://github.com/flatpak/flatpak-github-actions). 

Note that, Github or Gitlab may have pipeline quotas, size and bandwidth limits. Please consult their documentation on this.

## On Gitlab 

The instructions use Gitlab.com.

1. Create a new blank repository https://gitlab.com/projects/new#blank_project

2. Clone the repository locally:
   ```bash
   git clone git@gitlab.com:your_user_name/repo_name.git && cd repo_name
   ```

3. Create a `.gitlab-ci.yml` with the following contents:
   ```yaml
   variables:
     # Application id of the app, should be same as id used in flatpak manifest and appdata
     APP_ID: tld.vendor.app_name
     # Location of the flatpak manifest, root of git repository
     MANIFEST_PATH: $CI_PROJECT_DIR/${APP_ID}.yaml
     # Name of flatpak bundle
     BUNDLE: "${APP_ID}.flatpak"
     # Docker image to use
     DOCKER_REGISTRY: "docker.io/bilelmoussaoui/flatpak-github-actions"
     # Runtime to use, https://github.com/flatpak/flatpak-github-actions#docker-image
     RUNTIME_NAME: "freedesktop"
     # Runtime version to use
     RUNTIME_VRESION: "23.08"
     DOCKER_IMAGE: ${DOCKER_REGISTRY}:${RUNTIME_NAME}-${RUNTIME_VRESION}
     SCHEDULE_TASK: default
   
   stages:
     - setup
     - build
     - deploy

   # This will check for updates using external data checker and send PRs to the repo
   update-sources:
     stage: setup
     image:
       # https://github.com/flathub/flatpak-external-data-checker
       name: ghcr.io/flathub/flatpak-external-data-checker
       # Open shell rather than the bin
       entrypoint: [""]
     before_script:
       - git config --global user.name "${GITLAB_USER_LOGIN}"
       - git config --global user.email "${GITLAB_USER_EMAIL}"
     script:
       - /app/flatpak-external-data-checker --update --commit-only $MANIFEST_PATH
       
       # Creates a merge request targetting the default repo branch and sets up auto merge when pipeline succeeds
       - git push -o merge_request.create -o merge_request.target=${CI_DEFAULT_BRANCH} -o merge_request.merge_when_pipeline_succeeds
         "https://${GITLAB_USER_NAME}:${CI_GIT_TOKEN}@${CI_REPOSITORY_URL#*@}" || true
     artifacts:
       paths:
         - $MANIFEST_PATH
       expire_in: 1 week
     rules:
       # Set up a pipeline schedule for this https://docs.gitlab.com/ee/ci/pipelines/schedules.html
       - if: $CI_PIPELINE_SOURCE == "schedule" || $CI_PIPELINE_SOURCE == "trigger"
         when: always
       - when: never
   
   flatpak:
     stage: build
     image: ${DOCKER_IMAGE}
     variables:
       # Stable Flathub repo
       RUNTIME_REPO: "https://flathub.org/repo/flathub.flatpakrepo"
     before_script:
       # Sets up the stable Flathub repository for dependencies
       - flatpak remote-add --user --if-not-exists flathub ${RUNTIME_REPO}
     script:
       # Sets up GPG signing
       - gpg --list-keys --with-keygrip 
       - echo "allow-preset-passphrase" >> ~/.gnupg/gpg-agent.conf
       - gpg-connect-agent reloadagent /bye
       - cat $GPG_PASSPHRASE | /usr/libexec/gpg-preset-passphrase --preset $GPG_KEY_GREP
       - gpg --import --batch ${GPG_PRIVATE_KEY}
   
       # Build & install build dependencies
       - flatpak-builder build --user --install-deps-from=flathub --gpg-sign=${GPG_KEY_ID} --disable-rofiles-fuse --disable-updates --force-clean --repo=repo ${BRANCH:+--default-branch=$BRANCH} ${MANIFEST_PATH}
       # Generate a Flatpak bundle
       - flatpak build-bundle --gpg-sign=${GPG_KEY_ID} repo ${BUNDLE} --runtime-repo=${RUNTIME_REPO} ${APP_ID} ${BRANCH}
   
       - flatpak build-update-repo --gpg-sign=${GPG_KEY_ID} --generate-static-deltas --prune repo/
     artifacts:
       paths:
         - repo
       expire_in: 1 week
     tags: [""]
     rules:
       - if: $CI_PIPELINE_SOURCE == "schedule"
         when: never
       - when: always
       - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
         when: always
       - if: $CI_COMMIT_BRANCH != $CI_DEFAULT_BRANCH
         when: manual

   # Deploys the generated package to Gitlab pages name.gitlab.io/repo_name
   pages:
     variables:
       BUILD_OUTPUT_PATH: ${CI_PROJECT_DIR}/repo
     stage: deploy
     image: alpine:latest
     before_script:
       - apk add rsync
       # replace html assets relative path with pages absolute path
       - find $BUILD_OUTPUT_PATH \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i -e "s#href=\"\/#href=\"$CI_PAGES_URL/#g" -e "s#src=\"\/#src=\"$CI_PAGES_URL/#g"
     script:
       - mkdir public || true
       - rsync -av --exclude='public' --exclude='.git' $BUILD_OUTPUT_PATH/ public
     artifacts:
       paths:
         - public
       expire_in: 1 week
     rules:
       - if: $CI_PIPELINE_SOURCE == "schedule"
         when: never
       - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
         when: always
   
   ```

4. [Create](https://www.gnupg.org/gph/en/manual/c14.html) a new GPG key locally, to sign the repository.

5. Go to https://gitlab.com/-/profile/personal_access_tokens and create a token for `$CI_GIT_TOKEN`. Note that the token is valid for a maximum of one year and you should renew it before it expires.

6. Go to https://gitlab.com/your_user_name/repo_name/-/settings/ci_cd. Expand `General` and disable public pipeline. Click Save. Expand `variables`. Add the following 
   [variables](https://docs.gitlab.com/ee/ci/variables/#add-a-cicd-variable-to-a-project) necessary for the pipeline to run:
   
   | Type     | Key            | Value                      | Protected | Masked   |
   |----------|----------------|----------------------------|-----------|----------|
   | Variable | GPG_KEY_GREP   | Keygrip of GPG key         | Yes       | Optional |
   | Variable | GPG_KEY_ID     | Keyid of GPG key           | Yes       | Optional |
   | File     | GPG_PASSPHRASE | Passphrase of GPG Key      | Yes       | Optional |
   | File     | GPG_PRIVATE_KEY| ASCII armoured private key | Yes       | Optional |
   | Variable | CI_GIT_TOKEN   | Token                      | Yes       | Optional |

   To get the keygrip of the GPG key generated in step 4, run the following in your terminal and look at the `Keygrip` section:
   ```bash
   gpg --list-secret-keys --with-keygrip
   ```
   To find the keyid of the GPG key run the following in the terminal. The keyid should be in the first line starting with `sec` and `algorithm/id`. The `id` part is the required keyid.
   ```bash
   gpg --list-secret-keys --keyid-format=long
   ```
   Passphrase should be the one you entered while generating the key in step 4.
   The following will generate an ASCII armoured private key. Then paste the contents of that file in the CI variable settings.
   ```bash
   gpg --output private.pgp --armor --export-secret-key <keyid or email>
   ```

7. Create a `app_name.flatpakref` in the root of the git repo with the following contents. This will also make the repo searchable with `flatpak search`.
   ```
   [Flatpak Ref]
   Title=<A pretty application or repo name>
   Name=<Application id in tld.vendor.app_name format>
   Branch=< branch of generated ostree refs, defaults to master>
   Url=<Url of Gitlab page https://name.gitlab.io/repo_name>
   SuggestRemoteName=<A name for the flatpak remote>
   Homepage=<URL of the homepage>
   Icon=<Direct link to an icon>
   RuntimeRepo=< Link to repo where runtime and other dependencies are eg. https://dl.flathub.org/repo/flathub.flatpakrepo>
   IsRuntime=false
   GPGKey=<base64 encoded GPG key>
   ```
   You can find the Gitlab page in https://gitlab.com/your_user_name/repo_name/pages. Disable `Use unique domain` there and hit save.
   To generate the base64 encoded `GPGKey`, run the following and paste the string:
   ```bash
   gpg --export <keyid> > example.gpg
   base64 example.gpg | tr -d '\n'
   ```

8. The root of the repository should contain the following files: `.gitlab-ci.yml`, `app_name.flatpakref`, the flatpak manifest `tld.vendor.app_name.yaml` and any other files/folders referenced in the manifest. `git add` these files, `git commit` and `git push`.

9. If everything was set up correctly, the push will trigger the pipeline to build and deploy your application with flatpak.

10. To install the build, you can run:
    ```bash
    flatpak install --user https://gitlab.com/your_user_name/repo_name/-/raw/branch/app_name.flatpakref
    ```
    This will set up a flatpak remote userwide, install the dependencies and the application. Updates will be fetched when running `flatpak update` if they are available.

11. You can set up a [pipeline schedule](https://docs.gitlab.com/ee/ci/pipelines/schedules.html), optionally to automatically check for updates using flatpak-x-checker and send PRs to the repo.

### Credits

The CI template is based on the [work](https://gitlab.com/accessable-net/gitlab-ci-templates) of Flatpak community member [proletarius101](https://gitlab.com/proletarius101).
