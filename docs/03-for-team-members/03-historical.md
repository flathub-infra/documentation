# Historical documents

## Historical minutes

These were migrated from the [wiki](https://github.com/flathub/flathub/wiki).

### v1 specification

Initial set of goals for the initial Flathub implementation, as agreed on 21 March:

* Git tree containing recipes, or links to recipes
* Review and CI pipeline to build the recipes
* x86 and ARM V7/V8 builders
* Team responsible for maintenance, support and licensing
* PR workflow to make/review changes
* Server hosting a repository, to distribute binaries
* Single GPG key
* Static website with: home page, contact details, disclaimers, download link for the repository .flatpakrepo file
* Only distribute applications that are Free Software or that use "extra data" downloads at install time
* Host application screenshots
* GNOME Foundation to act as incubator: to provide legal organization and infrastructure
* Archive distributed source code for license compliance
* Contributor agreement for uploaders to carry liability for what they upload
* Disclaimer that Flathub has no obligation to distribute anything
* Build status and logs (could be Travis)

### Minutes, 2017 03 21

Notes from the Flathub discussion at the GTK Hackfest in London, 21 March 2017. These are in addition to the v1 specification.

Action items

* GNOME Foundation Board: needs to agree to the plan, resolve legal requirements - Neil/Allan
* Organize a hackfest - Cosimo
* Downstream interface - Matthias
* Create [Github repo](https://github.com/flatpak/flathub) and team - Alex
* Setup IRC channel and private mailing list for the review team - Allan
* Recruit review team - Allan
  * Reviewers to sign the key
  * Document review and contribution procedure
* Organize 2-weekly call - Allan

Development plan

* Pull all the recipes together
* Build scripts (based on existing ones from Alex and Endless)
* Local builds
* Stable releases

### Minutes, 2017 04 10

Attendees

 * Cosimo
 * Allan
 * Matthias
 * Alex
 * Emmanuele
 * Florian
 * Jorge
 * Juraj
 * Mario
 * Patrick

Minutes

Current implementation
 * Used buildbot because it was the easiest
 * Works for i386 and x86_64
 * Single signing key
 * Super-minimal, allows to build stuff and install stuff

Branches
 * Each app has its own individual commit history, so it lives in its own branch
 * If something needs to be shared, requires a git submodule or something like that

How does the review process work?
  * PR-based flow on the github repo
  * Buildbot can also do "try builds" from a branch
  * Somewhat hard to make a PR that goes to a new branch, which we'd be asking people to do
    * People that review the PR would need to adjust the target branch

How would we delete an app after it has been published?
  * On one side, we can remove the app from the github repository, but some other process would need to purge it from the OSTree repo
  * There's also an idea of a "tombstone" commit in OSTree that would flag it in such a way that it should be removed from the system (e.g. because it's malicious)
    * But for now it's just an idea, does not exist

Review team?
  * Right now just Alexander and Juraj
  * Alex can add more people to the team

Can we start adding recipes?
  * We should ask people to start adding their recipes and manifests
  * Not yet at a point where people should start using it in production/for wide use yet

ARM builders
  * These are still needed -- Alex wants to follow up with Tristan and/or use the other ARM machine we have in the GNOME datacenter

Licensing
  * Is GNOME a viable place to host these binaries, legally speaking?
  * Allan, Cosimo and Neil talked with the Board about it
    * Not a definitive answer but right now the GNOME Foundation would not be very happy about hosting non-free software
    * There is no problem however to using the GNOME Foundation as an incubator purely with free software
    * Neil was also looking into alternatives wrt. the legal organization/framework
      * Would this kind of solution be acceptable to our partners?
  * A free/non-free split could also be something to consider
    * Certainly we should always have an option to only ever receive free software
    * Another alternative would be to tag things differently

Stats/metrics
  * Would be great to have numbers for app publishers about the number of downloads

Store API in flatpak
  * Jorge shared a [small presentation](https://docs.google.com/presentation/d/1uA2JKbLLu5FGlUXmPv3NQP1eZgTky3Qt1zP6lgS0Jsk/edit?usp=sharing) about this idea.

  Content of the presentation as plain text:

  ```txt
  New “store” concept in flatpak command line application
  	Manage flatpak stores
    store-add          Add a new flatpak store
    store-modify       Modify properties of a configured store
    store-delete       Delete a configured store
    stores             List all configured stores
    store-search       Search applications in a configured store
    store-ls           List contents of a configured store



  .flatpakstore file
  	[Flatpak Store]
  	Title=Flathub Store
  	APIBaseURL=https://api.flathub.org/
  	Homepage=https://www.flathub.org/
  	Description=Flathub Store is ...
  	Icon=https://www.flathub.org/flathub-logo.png



  Workflow
  # User add stores:
  flatpak store-add flathub https://www.flathub.org/flathub.flatpakstore
  flatpak store-add otherstore https://www.otherstore.org/otherstore.flatpakstore




  Workflow
  # User search an app in all stores:
  flatpak store-search exampleapp

  Store         Channel   Id                                            Name             Version   Publisher    Summary
  flathub        stable       org.publisher1.ExampleApp   exampleapp    1.0           Publisher1   Example App
  otherstore  beta          org.publisher2.ExampleApp   exampleapp     3.4          Publisher2   Another example





  Workflow
  # Search by publisher
  flatpak store-search --by-publisher Publisher1

  Store         Channel   Id                                             Name                Version   Publisher    Summary
  flathub        stable       org.publisher1.ExampleApp    exampleapp       1.0          Publisher1   Example App
  flathub        stable       org.publisher1.ExampleApp2  exampleapp2     1.5          Publisher1   Example App 2






  Workflow
  # User installs an app:
  flatpak store-install flathub org.publisher1.ExampleApp

  This will run:
  API call to flathub to obtain url for org.publisher1.ExampleApp.flatpakref
  flatpak install https://URL/org.publisher1.ExampleApp.flatpakref
  ```

  * Would require a "smart server" with a REST API
  * Could be good to have a better search experience from the command line

Hackfest around Flathub
  * Cosimo has found a place in Florence that could host us
  * Late May/early June? - about 6 weeks time
  * Does not feel it's required right now, but perhaps to face the next set of problems
    * Also will need to find some sysadmin time for this

Runtimes
  * They're hosted on the same server/repo, but not built there
  * They're imported from their canonical repo

Website
  * Right now flathub.org points to the default nginx welcome page, we need something better
  * Jorge has ideas for gnome-software as a web service, if there's interest
  * Should we try and improve/style a bit the buildbot UI?
    * Repo here: https://github.com/alexlarsson/flathub-buildbot

So what's next? ACTION ITEMS!
  * Get more stuff built to make sure it works (Alex)
  * ARM builders (Alex)
  * Try builds, figuring out the PR workflow
  * Review guidelines and documentation
  * Recruit a small team of people for reviews/management (Allan)
    * Sysadmin wanted -- ask the GNOME sysadmin list (Allan)
  * KDE applications/outreach
    * Aleix has been quite active, we'll try to get him involved, especially if it helps with the ARM story
  * Improve the website - replace the homepage at flathub.org with a placeholder (Allan to ask Jimmac)
  * Dogfooding!

### Minutes, 2017 04 24

Attendees

 * Cosimo
 * Allan
 * Bartlomiej
 * Carlos Soriano
 * Ebassi
 * Florian
 * Joaquim
 * Mario
 * Matthias
 * Richard

Minutes

What happened since next time
  * We got the buildbot ARM builders
  * Applications are being created
  * First process to submit requests

Try builds/PR workflow
  * A bit WIP
  * We make a request against the "requests" repository under flathub
  * Need to update the wiki page with the new process
    * ACTION: Matthias to look into this
  * How to improve this?
    * Hard to figure out something that works with the github flow
  * Would be cool to test the builds before they're submitted
    * Alex added a way to ask buildbot to build a specific request, with a github comment
      * At the moment, this is only available to the people in the flathub organization, and they need to manually click a button
    * ACTION: look at connecting this to github comments

Review team
  * We have a list of people now that can review applications
  * Still need a private mailing list
    * ACTION: Allan to chase that down this week

Using Flathub for GNOME stable builds
  * Need to be discussed with the GNOME release team
  * We need to sort out repository migration story if we move them around
    * Could use a "tombstone" commit of some sort
      * But there's more complications related to GPG keys in the migration
  * We'll have to change something in how the manifests are published
  * ACTION: Carlos to investigate how to move forward with this

Sysadmin time
  * Allan talked to Andrea and he's interested
  * What do we need most urgently from sysadmin time?
    * Maintenance, but Alex should be driving the requirementes probably

KDE outreach
  * Progress on adding the Telegram build on Flathub
    * For that we need to integrate the KDE runtime in the builder too, which may be the only remaining item holding this up at this point
  * Allan has draft email to reach out to wider community soon

Website
  * Placeholder is in place
  * Good enough for now, if people want to improve it, they're welcome to

Spreading the word/getting more contributors
  * Are we at the point where we can start publicizing the website/asking people to contribute applications?
    * We could also publish a list of "wanted" applications for people that want to start contributing
      * Like a "GNOME goal", we could have a list of applications
  * There are already good write-ups as to why Flatpak is a good technology/etc if needed
  * We can also involve the Solus maintainers, since they are adopting Flatpak exclusively

How do we communicate when applications are updated?
  * We could have an RSS feed on the Flathub website itself
  * Right now there's no way to figure out which applications are available
    * gnome-software in master can do this by searching for the repository name
  * Allan: The most interesting thing in the immediate term would be to highlight new applications
    * Far in the future: having a way in gnome-software to see new applications
    * More in the short term: having something in the website/twitter announcing when something new is available, so people can test it
  * Are we comfortable talking about Flathub on e.g. twitter?
    * Not just whether we're technically ready for it, but also from a legal perspective
      * At the moment there's no legal structure for liability
      * ACTION: Allan to reach out to RobMcQueen/Neil for updates on this
        * One of the things we may need is a contract with the ISP delineating the responsibilities

Attribution for application authorship/etc in gnome-software
  * Needs adjustments to design and more metadata possibly, but TBD what exactly at this point

Themes vs Flathub
  * Flatpak now supports theme extensions in master
  * We should think whether themes are part of Flathub too
  * It feels like the answer is yes, but how are they discovered?
  * Goal: make the application fit into the desktop
    * Could be an automatism that looks at the desktop theme and matches the flatpak extension
    * There is not necessarily the need for an UI to browse and install the themes
    * The automatic instalation is certainly desired though
    * Should it be part of gnome-software or in libflatpak?
      * Probably gnome-software, because libflatpak should not really look into your desktop settings
    * ACTION: Matthias to come up with some draft proposal of how this could work

### Minutes, 2017 05 08

Attendees

 * Allan
 * Alex
 * Matthias
 * RobMcQ
 * Richard
 * Bartlomiej
 * Florian
 * Carlos Soriano
 * Patrick
 * Jorge
 * Cosimo

Minutes

 * What happened since last call
   * Requests repository was renamed
   * Bunch of new stuff got built
   * We have a mailing list for the review/maintenance team, not sure if it's really working though
   * Allan chatted with Neil about legal framework stuff, this is blocking a more wide announcement

 * Mailing list may not be properly working
   * Something needs a root password account on fd.o
   * ACTION: Rob will unblock this by looking for his root pwd on a magic piece of paper

 * Legal framework
   * Neil should chat with Rob, there's a lot that needs figuring out there
   * We should individually be protected from liability
     * Also our employers should be protected from liability
   * If we could get time from the legal advisors the GNOME Foundation has, this could be useful
     * But we should not necessarily try to centralize the liability into a single organization and "staple all together"
   * For instance, in ChromeOS, "the Chromium authors" are responsible for the bits; there's Google in the mix, but it's not all them
   * If something were ever to happen, legal backing should be nice to have though
     * Could be as easy as a resolution from the GNOME Board committing to use our legal resources should things get bad
   * Another aspect of this is how the legal framework affects partners that want to enable this out of the box
     * There may need to be an organization that they can relate to
     * This is a good place to be though, we first need to figure out the basics
     * We're not trying to centralize a stronger guarantee of liability than the rest of the operating system, for people that want to enable this by default

 * Sysadmin time
   * We need to have a solid repository server
     * If the build backend goes down for a couple days, it's not the end of the world, but the frontend should stay up
   * The GNOME Foundation could also possibly help with funding this
   * ACTION: Alex will write down the current architecture of the system and its requirements, to share it with the sysadmin team

 * Outreach
   * Allan reached out to KDE e.V., TDF, Mozilla and other players in the space
   * We're trying to organize a call with them at a higher-level to get things started

 * Website
   * Do we want to make something nicer before we go wider announcing this?
     * Jakub has something in the plans, but it's not done yet
   * The buildbot UI could also be tweaked a bit, by e.g. adding a Flathub logo somewhere
     * Tom was interested in this?
     * The buildbot config is in github so this should be easy

 * Try builds/PR workflow
   * This is very manual -- someone needs to manually press a button to build a request
   * Buildbot may have a way to build stuff based on a PR comment, but we have not looked into it
   * ACTION: Bartlomiej to look into it this week

 * Using Flathub for GNOME stable builds
   * Carlos pushed Nautilus, but before we do it for all the other applications, we'd need redirection between repositories to update
     * ACTION: Alex is working on this today already
     * Once that's out of the way, Carlos will continue
   * We'll live with duplicate manifests for the time being -- one in git and one stable in flathub that uses tarballs

 * Stats for downloads
   * We'd like to have automated log collections to make download stats
   * This is part of the value that Flathub can create for upstream projects
   * Not hard, we need some sort of back mapping to app IDs from the commit SHAs or deltas, but needs to be done
     * This is kind of in between a sysadmin and a developer task
   * If we had the stats, how would we make them available?
     * This opens up larger questions, could be on-demand for now

 * Themes
   * Matthias talked to Richard for gnome-software integration, but did not come to any conclusions yet
     * Could be manual for now, but longer-term we should have something automatic
   * The minimum issue here is that since the runtime only contains Adwaita, all the apps use that instead of the distro theme
   * There's also a technical issue; GTK2 and QT themes are .so files so they have a hard dependency to be built for a specific platform
   * Would be useful to have examples even just for icon and GTK3 themes though, so that more people can start adding new themes
     * The extension point right now is versioned with the GTK version
   * For QT, we should begin by having the KDE runtime on Flathub

 * Support/updates
   * We should at least set expectations for things like security issues
   * We should also have a framework where we can make errata-like processes (e.g. updates are announced on a certain day) possible
     * E.g. skip the queue for security builds

 * GPG key
   * The key is in a locked/encrypted file in another machine
     * Hard to do better than this without a HW crypto machine
   * Alex has master password

 * "extra-data" kind of applications
   * There would be a benefit to put them in flathub
   * Should have a watchdog at least when the links are 404
     * Endless has this
   * Do we want them there?
     * Seems that we'd want them, but we need to at least separate them out because not everyone may want to see them since they're not free software
     * What is the official plan?
       * Tagging them as free/non-free, then have a toggle in gnome-software
       * Right now, the appdata.xml contains the license tag, and if there's a proprietary license, has support to show it/with an EULA (but there's no support for the EULA in the appdata ATM)
       * There's some license-tracking in Yocto, could be valuable to converge there
     * There's a benefit launching 1.0 with these apps in, to set the right expectations

 * Screenshots hosting
   * We don't do this, but since we have a webserver, we could do that here too
   * There's an appstream util to rewrite screenshots, used in Fedora
   * ACTION: Alex to look into this with Richard

 * Source code archiving
   * There's a flatpak extension that makes this possible
   * We can enable this by default in Flathub
   * ACTION: Alex to do that

 * Build logs
   * We don't index by app, so it's a bit hard to find logs right now
   * Not high-prio, could probably be done with buildbot
   * Needs someone to look into this

### Minutes, 2017 05 22

Attendees

 * Allan
 * Alex
 * Georges
 * Joaquim
 * Jorge
 * Mario
 * Richard
 * Cosimo
 * Florian
 * RobMcQ

Minutes

Review of action items
  * Mailing list should now be working, Rob restored his root password
    * Who should be on the list?
      * People that are interested in maintaining the infrastructure
    * What's the policy to access the list?
      * We look at the requests individually
  * Legal Framework
    * The GNOME Foundation Board agreed to connect to our legal counsel to try and get answers to our questions
    * Next step is to prepare the questions on an Etherpad, which Rob is working on at the moment
  * Sysadmin time
    * It may be easiest to manage the Flathub hosts as GNOME hosts, but that's not easy if we need to keep them outside of the GNOME administrative domain
    * We will have to understand the legal framework around liability before we can architect a good solution for how the hosts' network should be built
    * Alex posted architecture requirements document on the mailing list, but we hit the problem above while analysing it
  * Outreach
    * Allan about to go on holiday, but he'll set up a call with KDE and TDF when he's back
    * Having an initial chat sounds useful at this point, even though the overall legal framework is not in place yet
    * For organizations like Mozilla which build their own binaries, do we have any technical work to do to accommodate this?
      * According to Alex we can add some kind of trusted path for partners that want to ship their own binaries without building them on our own infrastructure, should this be a blocker
      * This could be a slippery slope though
      * If we had the separation between a "store" that contains bundles made by other companies, and flathub as a build system, this would not be an issue
        * Flathub does not necessarily end up being the only place to go at least in version 1, but this is something good to think about in the future, when the format gains more momentum
        * A "partner" program sounds like a good idea in general though
    * How do we handle the ownership of Flathub bundles? Application IDs don't have the name of the packager, but the upstream name
      * That's generally OK, it's not different from how it works in packages at the moment
      * We also as a policy will give access to the upstream developers whenever they ask for it or want to make changes to their bundle
  * Website
    * We have a new homepage, thanks to Jakub!
    * Still a placeholder, but a nicer looking one
  * Flathub for GNOME builds
    * Now OSTree has a repository redirection feature that Alex implemented
    * Technically this could already be made to work, but we don't know how reliable the infrastructure would be, so perhaps we should figure out things like backup and a better maintenance policy
  * Themes
    * We got most of the GTK3 themes, at least those that are in use by the most popular distributions
    * Need to add icon themes now
    * Also there's no hook from gnome-software to install the theme "runtime" automatically
  * Screenshot hosting
    * Alex landed this into Flatpak today
    * Will land this in Flathub once it's released -- screenshots will be hosted there too
  * Source code archiving
    * Not enabled yet, will come as part as the release tomorrow as well

Demo time
  * Jorge demoes a web app that displays all the applications inside Flathub in a nice UI
  * Upon clicking on an app, the details are displayed and a .flatpakref file can be downloaded
  * Next steps
    * CSS improvements
    * Reviews
    * Ratings
    * Related applications
    * Displaying screenshots

Flatpak t-shirts
  * We have designs, but they don't exist yet
  * Allan is doing them for GUADEC

### Minutes, 2017 06 19

Attendees

* Alex Larsson
* Florian
* Joaquim Rocha
* Jorge
* Matthias Clasen
* Michael Hall
* Rob McQueen

Minutes


* Updates from Rob
   * Mailing lists
     * Renamed xdg-app -> flatpak
     * Renamed flathub -> flathub-admins
   * Legal
     * Working on attorney<->client privelege issues to get advice, GNOME foundation is in discussions with Luis
   * Infrastructure
     * We have a server! Plan succeeded per <link to ML>
     * Next step there is to bring up VMs and move stuff over from Scaleway
     * Waiting on AV to have a look at ansible setup
     * Will see if Endless sysadmin team can lend a hand too
     * Won't block on it, but will try and get it in early on so things don't get messy
  * GPG keys
    * New 4096-bit RSA master key generated, subkey stored on Yubikey Nano's (USB HSM via CCID proto) so the server can do online signing but the key can't be copied/removed
* Steam available as Flathub!
  * https://www.reddit.com/r/linux_gaming/comments/6hzkz4/steam_is_now_available_as_a_flatpak/dj302av/
  * Graphics issues - AMD proprietary driver is not provided inside Flatpak
  * Update issues - it still downloads/updates itself, which is kinda ugly
  * Issues with
* Missing icon themes worsen the flathub user experience
  * we have some now manually/separately packaged
  * can Flatpak import them off the host system / download them more easily?
  * ideally something in the desktop could install the theme in Flatpak
  * or: export/share the themes directly in Flathub so they can be installed via GNOME Software, and exported to the desktop
  * other platforms ship themes/icons/launchers in GNOME Software, although it wasn't part of the original intention

### Minutes, 2017 11 23

Flathub call, Nov 23rd 2017

Attendees

* Alex
* Allan
* Bartlomiej
* Florian
* Jorge
* Joaquim (for 5 mins)
* Patrick
* Rob

Minutes

* Joaquim is planning to write a Flathub-friendly version of Endless
* Jorge asks whether we can focus on launch / goals with a press release - provide numbers, developers, apps, users, etc - unveil new apps website - encourage users and developers
  * what would we need?
    * webapp for apps
    * infrastructure ready
      * monitoring
      * high availability - backups? yes for hosts/config, not reliable for repo (TLS timeouts!)
      * mirrors - set up repo.flathub.org as the repo frontend so we can replicate that on different servers as needed (separate that from the flathub.org) (prio #2)
      * config/system management
    * developer documentation - eg electron app, video tutorial, etc
    * terms of service
    * clarify owner/responsibility to manage expectations, liability, etc
    * submission guidelines - what applications, legal/ethical constraints, etc?
  * stack overflow so that google finds solutions when we help people - IRC stuff is transient
  * track metrics like tweets, users, traffic, etc
  * future economical sustainability - patreon? paypal? etc
  * promotion of project - make it "healthy" - blog (eg medium) - publish updates, etc - see https://angular.io/ -> Blog maintained by posts from the team
  * missing "must have" apps?
  * statistics
    * interesting to app developers? could discourage people if we share small numbers / too early?
    * how to get the logs into one place to analyse? anonymise IP without losing geoloc info? hook the hash -> ref stuff up to the log rotate handler?
  * set up flatpak website w/ SSL (sysadmin prio #1)
  * quality checking for app stream data - icons, release tags, etc
  * website - include consultants who can help w/ Flatpak support?
  * submission flow - working OK?
    * online hosting/sharing of build artifacts for test builds, to help with development
    * extra data validate at build time - check URL, size, hash, etc
  * migration issues
    * moving from one repo to another (gnome -> flathub)
    * app ID changing name (already happened on flathub)
  * consistency issues
    * removing an arch doesn't stop publishing the app
  * documentation! hello world sucks. need to direct people to flatpak-builder at least. Patrick will take a look

### Minutes, 2018 01 22

Flathub call, Jan 22nd 2018

Attendees

* Alex
* Allan
* Emmanuele
* Bartlowmiej
* Joaquim
* Jorge
* Matthias
* Michael
* Nick
* Patrick
* Richard
* Rob

Agenda

* Minimum requirements and development plan for the new web app (Allan)
* Temporary arrangements for the existing websites (Allan)
* Moving content from flatpak.org to flathub.org/docs.flatpak.org: (Allan)
* Command line guide
  * Getting flatpak
  * Press page
  * Hello world
  * xdg-desktop-portal documentation
* Submission guidelines - any improvements? (Allan)
* Hackfest in May? (ramcq)
* https://status.flathub.org/ (nothing to say, just - oo shiny)
* Splitting up free/nonfree/ugly
* Mirrors in other countries
* Scope of Flathub
  * Is it intended to distribute proprietary apps?
  * Is it intended to allow selling apps?
  * Is it intended to allow direct author publishing
* Requiring OARS for app submission


Actions from last time

* Sysadmin stuff
  * Flatpak website SSL = done
  * Beta apps website = done
  * Move repo to new hostname (dl.flathub.org) = done

Minutes

* Jorge adding support for remote icons to new webapp - https://beta.flathub.org/
  * Allan working on static website - make changes in the new one?
* Alex and Rob spoke with Neil/Karen about terms of use & contribution terms - no reply so far
* Allan: What's the minimum requirements to switch over ?
  * Poor web experience could be costing us in terms of onboarding users and developers
* Web app minimum requirements:
  * Documented workflow for the team, establish that it works for people
    * README is in place on https://github.com/jgarciao/linux-store-frontend
  * An icon for every application
    * Copying remote icons into repo is OK now
  * Setup guide hosted on flathub.org (Allan can write initial draft)
  * Shortlist of featured apps prominent on the site, probably as part of the home page (which needs to look nice)
  * Show both .flatpakref download button and CLI instructions when you click install
  * Some way to get to the other apps - either browsing by category or search
  * Nicer styling
  * Better caching / page load optimisation
    * Improve page load times, especially the first page
  * Move some of the existing flatpak.org material to docs.flatpak.org
  * Appdata for 3rd party proprietary apps (Spotify, Skype, etc) (Endless could help provide this)
    * Nick has just updated the data for Skype and Spotify \o/
  * Consider privacy issues, policy, and use of analytics
* Scope of Flathub
  * Is it intended to distribute proprietary apps?
  * Indirect at present - "extra data" downloads
    * At present not directly, hard to ensure that source is provided for GPL components of binary blobs
      * Mozilla Firefox is a test case
      * We could figure out how to get the source to match the binary uploads, but let's cross that bridge when we get to it...
  * Is it intended to allow selling apps?
    * Not at present, buut.....
  * Is it intended to allow direct author publishing
    * **Absolutely**
* Separating free/non-free apps
  * Currently in the review guidelines - opinion varies whether it's actually accurate
  * "Patented" (by whom, where, etc?) isn't currently represented
    * Could we do some metadata tag to filter by? Sure...
    * Would it solve the issue? Who knows.
  * Debian - requires separate metadata streams
    * How would that look with Flatpak?
* Submission guidelines are unclear about audience, they say "Package" as well

Action items
* [Rob] Check back with Neil//Karen about the legal terms: TODO
* [Jorge] Share details about modifying webapp w/ designers: TODO
* [Nick] Work on (some of) the app icons: TODO
* [] Put out a call for community contributions to finding better app icons: TODO
* [Joaquim] Patch GNOME Software to apply metadata updates, so that users are migrated to dl.flathub.org: TODO
* [Michael] Blog to the Ubuntu community recruiting a package maitainer for flatpak package with a focus on SRU: TODO
* [Patrick] Document contributor workflow for the new web app: TODO
* [Michael] Ask Indonesia ambassadors about a local host for a flathub package proxy: TODO
