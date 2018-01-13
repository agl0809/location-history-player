export default function heatmap() {
    function readFile(fileUrl) {
        let request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.open('GET', fileUrl, true);
        request.send(null);
    }

    return {readFile}
};