export default class LoadingWindow {
    private preloader: HTMLElement;
    private preloaderBar: HTMLElement;
    private preloaderName: HTMLElement;
    private preloaderIcon: HTMLImageElement;
    private preloaderBackground: HTMLElement;

    constructor() {
        this.preloader = document.getElementById('application-preloader') as HTMLElement;
        this.preloaderBackground = this.preloader.querySelector('.preloader_background_overlay') as HTMLElement;
        this.preloaderIcon = this.preloader.querySelector('.preloader_icon') as HTMLImageElement;
        this.preloaderName = this.preloader.querySelector('.preloader_name') as HTMLElement;
        this.preloaderBar = this.preloader.querySelector('.preloader_bar') as HTMLElement;

        // this.setPreloaderBackground(backgroundColor);
        // this.setPreloaderIcon(appLogo);
        //this.setPreloaderName(appName);
    }

    updateLoadingProgress(progressRatio: number) {
        this.preloaderBar.style.width = `${progressRatio * 100}%`;
    }

    setPreloaderName(name: string) {
        this.preloaderName.textContent = name;
    }

    setPreloaderIcon(iconUrl: string) {
        this.preloaderIcon.src = iconUrl;
    }

    setPreloaderBackground(color: string) {
        this.preloaderBackground.style.backgroundColor = color;
    }

    completed() {
        this.preloader.classList.add('ended');
    }
}

