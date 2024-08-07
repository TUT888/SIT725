var calSymb = {
    "add": "addition (+)",
    "sub": "subtraction (-)",
    "mul": "multiplication (*)",
    "div": "division (/)"
}

const displayTop10History = (items) => {
    var count = 0;
    for (let i=items.length-1; i>=0; i--) {
        count += 1;
        element = items[i];
        let itemToAppend = `
            <tr>
                <td>${element.n1}</td>
                <td>${element.n2}</td>
                <td>${calSymb[element.operation]}</td>
                <td>${element.result}</td>
            </tr>
        `
        $("#history-table").append(itemToAppend);
        if (count==5) {
            break;
        }
    }
}

const displayHistory = (items) => {
    
    items.forEach(element => {
        let itemToAppend = `
            <tr>
                <td>${element.n1}</td>
                <td>${element.n2}</td>
                <td>${calSymb[element.operation]}</td>
                <td>${element.result}</td>
            </tr>
        `
        $("#history-table").append(itemToAppend);
    });
}

// Save calculation (MongoDB)
const formSubmitted = () => {
    let formData = {};
    formData.n1 = $("#number1").val();
    formData.n2 = $("#number2").val();
    formData.operation = $('input[name="math"]:checked').val();
    formData.result = $("#result").html();

    console.log(formData);
    postCalculation(formData);
}

function postCalculation(calculation) {
    $.ajax({
        url: "/api/saveHistory",
        type: "POST",
        data: calculation,
        success: (result) => {
            if (result.statuscode==201) {
                alert("Calculation post successful!");
            }
        }
    })
}

function getTop10Calculation() {
    $.get("/api/getAllHistory", (res) => {
        if (res.statuscode == 200) {
            displayTop10History(res.data);
        }
    })
}

function getAllCalculation() {
    $.get("/api/getAllHistory", (res) => {
        if (res.statuscode == 200) {
            displayHistory(res.data);
        }
    })
}

// Handle calculation
$(document).ready(function () { // wait for the page to download
    $("#calBtn").click(function () {
        let n1 = parseInt($("#number1").val());
        let n2 = parseInt($("#number2").val());
        let selectedMath = $('input[name="math"]:checked').val();
        if (n1 && n2) {
            console.log(selectedMath);
            $.ajax({
                url: `http://localhost:3000/${selectedMath}TwoNumber?n1=${n1}&n2=${n2}`, success: function (result) {
                    $("#result").html(result.data);
                }
            });
            $("#submitBtn").prop('disabled', false);
        } else {
            alert("Input values are invalid, make sure to input both number 1 and number 2.");
        }
    });

    $("#clearBtn").click(function () {
        $("#number1").val("");
        $("#number2").val("");
        $("#result").html("0");
        $("#submitBtn").prop('disabled', true);
    })

    $("#submitBtn").click(function() {
        formSubmitted();
        location.reload();
    })
});