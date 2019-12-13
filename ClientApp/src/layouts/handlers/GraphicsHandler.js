import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export default class GraphicsHandler {
    
    static instance = new GraphicsHandler();
    mobileWidth = 850;
    normalMobileWidth = 400;
    normalMobileHeight = 375;
    miniMobileHeight = 200;
    density = window.devicePixelRatio;
    width = window.innerWidth / window.devicePixelRatio;
    height = window.innerHeight / window.devicePixelRatio;
    cmWidth = 0;
    cmHeight = 0;
    theme = createMuiTheme({
        palette: {
            primary: {
                main: '#673ab7',
            },
            secondary: {
                main: '#2979ff',
            },
        },
    });
    production = false;
    
    constructor() {
        GraphicsHandler.instance = this;
        this.updateCmWindowDimensions();
    }
    
    mainGradient(alpha) {
        if (alpha === undefined) alpha = 0.8;
        return `linear-gradient(135deg, rgba(63,152,255,${alpha}) 15%, rgba(116,70,255,${alpha}) 75%)`;
    }
    
    secondaryGradient() {
        return 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';
    }
    
    radialFogGradient() {
        return 'radial-gradient(circle, rgba(0,0,0,0) 30%, #fff 60%)';
    }
    
    cloudImage() {
        return window.location.origin + (this.production ? '/hormoz-frontend' : '') + '/cloud.svg';
    }
    
    loginBackground() {
        return window.location.origin + (this.production ? '/hormoz-frontend' : '') + '/login_page_background.jpg';
    }
    
    dashboardBackground() {
        return window.location.origin + (this.production ? '/hormoz-frontend' : '') + '/LoginBackground.jpg';
    }
    
    dpToPx(dp) {
        return dp * this.density;
    }
    
    pxToDp(px) {
        return px / this.density;
    }
    
    isMobileScreen() {
        return this.cmWidth < 15;
    }
    
    isWidePortableDevice() {
        return this.dpToPx(this.width) > 1.15 * this.mobileWidth;
     }
    
    isWideMobileScreen() {
        return this.dpToPx(this.width) > 1.5 *  this.normalMobileWidth;
    }
    
    isLongMobileScreen() {
        return this.dpToPx(this.height) > 1.5 * this.normalMobileHeight;
    }
    
    isMiniMobileScreen() {
        return this.dpToPx(this.height) > 1.5 * this.miniMobileHeight;
    }
    
    updateCmWindowDimensions() {
        let dpiX = document.getElementById('dpi').offsetWidth;
        let dpiY = document.getElementById('dpi').offsetHeight;
        this.cmWidth = window.innerWidth / dpiX;
        this.cmHeight = window.innerHeight / dpiY;
    }
}