
let trainedNet;

function encode(arg) {
    return arg.split('').map(x => (x.charCodeAt(0) / 256));
}

function processTrainingData(data) {
    return data.map(d => {
        return {
            input: encode(d.input),
            output: d.output
        }
    })
}

function train(data) {
    let net = new brain.NeuralNetwork();
    net.train(processTrainingData(data));
    trainedNet = net.toFunction();
};


var tweet = null;

//submit
function sub() {
    tweet = document.getElementById("prod").value;
    console.log(tweet)
    console.log(execute(tweet));
};

function execute(input) {
    var result = null;
    let results = trainedNet(encode(input));
    console.log(results)
    let output;
    let certainty;
    if (results.trump > results.kardashian) {
        output = 'Donald Trump'
        certainty = Math.floor(results.trump * 100)
    } else {
        output = 'Kim Kardashian'
        certainty = Math.floor(results.kardashian * 100)
    }

    result = "Hay mas" + certainty + "probabilidad de que este tweet haya sido escrito por" + output;
    document.getElementById("resultado").setAttribute("value",result)
    return "Hay mas" + certainty + "probabilidad de que este tweet haya sido escrito por" + output;
}

train(trainingData);

