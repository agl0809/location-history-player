import Dropzone from 'dropzone';

export default function heatmap() {
    const DROPZONE_URL = "/";
    const DROPZONE_TARGET = document.body;

    function init () {
        this.dropzone = new Dropzone(DROPZONE_TARGET ,  {url: DROPZONE_URL});
    }

    return {init}
};