# Submission

## How to submit an app

App submissions are extremely welcome and the process is straightforward. Before submitting an app for inclusion on Flathub, please follow the [[app requirements]] to ensure that it is technically and legally compatible with the Flathub service. Once this has been done, you can submit the app for inclusion.

Flathub is managed through a GitHub project, and app submissions take place as pull requests. To submit an app:

1. Fork the [Flathub repository on GitHub](https://github.com/flathub/flathub/fork) with _"Copy the master branch only"_ unchecked.
2. Clone the fork:
   `git clone --branch=new-pr git@github.com:your_github_username/flathub.git`
3. Create a new branch with your app’s name:
   `git checkout -b your_app_name`
4. Add your app’s manifest to the branch, commit it and push the commit
5. Open a pull request against the `new-pr` branch on Github
6. Your pull request will then be reviewed by the Flathub admins

Once your pull request has been approved, a new repository will be created for your application, containing your app’s Flatpak manifest. You will have write access for the repository. The Flathub service then uses the manifest from your repository to continuously build and distribute your application on every commit.

## Someone else has put my app on Flathub—what do I do?

Flathub is primarily intended as a service that is used by app developers to distribute their apps. Our goal is to give developers control of their apps and to allow them a closer relationship with their users without middlemen getting in the way. However, as part of setting up Flathub, some applications are being distributed on Flathub without the involvement of their developers. We would prefer that these applications are controlled by their authors.

If an application that belongs to you is being distributed without your involvement, please get in touch with [the Flathub admins](mailto:flathub@lists.freedesktop.org), so that we can discuss transfering ownership.

## There’s an app that I’d like to see on Flathub, but I’m not the developer

If there’s an app that you'd like to be distributed on Flathub, the best first course of action is to approach the app’s developers and ask them to submit it. Remember that for some projects or communities, this may be the first that they have heard of the Flatpak technology or interacted with somebody who advocates it. When you are making such requests, please be aware that the people you are talking to may be forming their first impressions of Flatpak as a technology and a community. Always remain respectful, patient and courteous even if you face skepticism or dissenting opinions. You can also start a topic on the [Flathub forum](https://discourse.flathub.org/c/requests/5) to find whether others are interested in using, helping to build or advocate for the app in Flatpak format.

## Getting help

If you are unsure about the process of submitting an app to Flathub, or are experiencing issues fulfilling all the requirements, you can contact the Flatpak community for help. General queries can be made on community channels, such as the [matrix channel](https://matrix.to/#/#flatpak:matrix.org) and [discourse](https://discourse.flathub.org/). For more sensitive issues, please use the private Flathub admins mailing list.
