export default function heatmap() {

    function readFile(fileUrl) {
        const locationUrl = fileUrl;

        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.overrideMimeType("application/json");
            request.open('GET', locationUrl, true);
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    const resp = request.responseText;
                    if (resp.error) {
                        reject(resp);
                    } else {
                        resolve(resp);
                    }
                    request.send(null);
                }
            };
        });
    }

    return {readFile}
};