var compile = new XMLHttpRequest();
var result = new XMLHttpRequest();

document.getElementById("comp").addEventListener('click', function() {
    var data = document.getElementById("txt").value;
    var code_Id = document.getElementById("lan").value;
    var link = "https://codequotient.com/api/codeResult/";

    var obj = {
        code: data,
        langId: code_Id
    };

    compile.open("POST", " https://codequotient.com/api/executeCode");
    compile.setRequestHeader('Content-Type', 'application/json');

    compile.send(JSON.stringify(obj));

    compile.addEventListener('load', function(e) {
        var res = JSON.parse(e.target.responseText);

        if (res.error) {
            cdocument.getElementById("out").innerHTML = res.error;
        } else {
            link += res.codeId;

            setTimeout(function() {
                result.open("GET", link);
                result.send();

                result.addEventListener('load', function(e) {
                    var response = JSON.parse(e.target.responseText);

                    if (response.data != null) {
                        var out = JSON.parse(response.data);
                        console.log(out);

                        if (out.output != "")
                            document.getElementById("out").innerHTML = out.output;
                        else if (out.errors != "")
                            document.getElementById("out").innerHTML = out.errors;
                    }
                });

            }, 5000);

        }
    });

});