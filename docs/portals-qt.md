# Portal support in Qt and KDE

Qt and KDE libraries will transparently use portals for some
functionality when they detect that they are being used inside a Flatpak
sandbox. Here are some hints for what Qt or KDE applications should do
to benefit from this.

-   Use `QDesktopServices::openUrl(const QUrl &url)` or `KIO::KRun` to
    open URIs or send an email when using `mailto` URL
-   Use `QFileDialog` class to open files and, as of Qt `5.18.90`,
    directories. Avoid using `QFileDialog::DontUseNativeDialog`. Note
    that portals cannot currently give access to directories on the host
    filesystem
-   Use `KNotification::notify()` to show notification
