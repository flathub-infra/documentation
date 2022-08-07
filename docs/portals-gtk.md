# Portal support in GTK

GTK will transparently use portals for some functionality when it
detects that it is being used inside a Flatpak sandbox. Here are some
hints for what GTK applications should do to benefit from this.

-   Use `g_get_user_config_dir()`, `g_get_user_cache_dir()` and
    `g_get_user_data_dir()` to find the right place to store
    configuration and data
-   Use `GtkFileChooserNative` (or `GtkFileChooserButton`) to open
    files. As of [xdg-desktop-portal-gtk]{.title-ref} 1.7.1 it can also
    open directories.
-   Use `GtkPrintOperation` for printing
-   Use `gtk_show_uri_on_window()` or
    `g_app_info_launch_default_for_uri()` to open URIs
-   Use `gtk_application_inhibit()` if you want to inhibit idle or
    logout
-   Use `g_application_send_notification()` to show notifications
-   Use the `GtkApplication::screensaver-active` property to monitor
    scrensaver status
