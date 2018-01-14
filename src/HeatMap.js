export default function heatmap() {
    function readFile(fileUrl) {
        const locationUrl = fileUrl;

        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.overrideMimeType("application/json");
            request.open('GET', locationUrl, true);
            request.onreadystatechange = function() {
                if (request.readyState === 4) {
                    const resp = JSON.parse(request.responseText);
                    if (resp.error) {
                        reject(resp.error);
                    } else {
                        resolve(resp);
                    }
                }
            };
            request.send(null);
        });
    }

    return {readFile}
};