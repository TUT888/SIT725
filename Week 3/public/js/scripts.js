const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}

$(document).ready(function () { // wait for the page to download
    $("#calBtn").click(function () {
        let n1 = parseInt($("#number1").val());
        let n2 = parseInt($("#number2").val());
        let selectedMath = $('input[name="math"]:checked').val();
        if (n1 && n2) {
            $.ajax({
                url: `http://localhost:3040/${selectedMath}TwoNumber?n1=${n1}&n2=${n2}`, success: function (result) {
                    $("#result").html(result.data);
                }
            });
        } else {
            alert("Input values are invalid, make sure to input both number 1 and number 2.");
        }
        
    });

    $("#clearBtn").click(function () {
        $("#number1").val("");
        $("#number2").val("");
        $("#result").html("0");
    })
});