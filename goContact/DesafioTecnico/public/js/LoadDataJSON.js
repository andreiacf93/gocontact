function LoadDataJson() {
    $.ajax({
        url: "/jsonFiles/weather.json",
        type: "GET",
        dataType: "json",
        success: processDataJson,
        error: processDataJsonError
    });
}


function processDataJsonError(xhr, status, errorThrown) {
    alert("Error loading json: " + xhr.status + " " +
        xhr.statusText);
}
