var testArray = [{
        name: "Species One",
        maxDecRate: 40,
        relatedSpecies: [{
                name: "Species Ten"
            },
            {
                name: "Species Eleven"
            },
            {
                name: "Species Twelve"
            },
            {
                name: "Species Thirteen"
            },
            {
                name: "Species Fourteen"
            }
        ]
    },
    {
        name: "Species Two",
        maxDecRate: 100,
        relatedSpecies: [{
                name: "Species Twenty"
            },
            {
                name: "Species Twenty One"
            },
            {
                name: "Species Twenty Two"
            },
            {
                name: "Species Twenty Three"
            }
        ]
    },
    {
        name: "Species Three",
        maxDecRate: 70,
        relatedSpecies: [{
                name: "Species Thirty"
            },
            {
                name: "Species Thirty One"
            },
            {
                name: "Species Thirty Two"
            },
            {
                name: "Species Thirty Three"
            },
            {
                name: "Species Thirty Four"
            },
            {
                name: "Species Thirty Five"
            }
        ]
    }
]


var degreeChange;
var decreaseRate;

// Vertical scroll height. It is changealbe and currently set as 20000px.
var verticalHeight = 20000;

// Selected Species and max decrease rate will be assigned based on user input(click)
var selectedArray = testArray[0]
var selectedSpecies = selectedArray.name
var selectedSpeciesMaxDecreaseRate = selectedArray.maxDecRate
var relatedSpeciesArray = selectedArray.relatedSpecies


function displayRelatedSpecies(objectArray) {
    var mapObject = objectArray.map(function (species) {
        return `<li class="related-tag"><a href="#">${species.name}</a></li>`
    })
    return mapObject.join('')
}

var relatedSpeciesHTML = displayRelatedSpecies(relatedSpeciesArray)



// Scroll Interaction
window.addEventListener("scroll", function (e) {
    degreeChange = (window.pageYOffset / (verticalHeight - this.window.innerHeight)) * 2;

    document.getElementById("degree-change").innerHTML = degreeChange.toFixed(1);
    // Set for debugging. Will be deleted after testing. 
    document.getElementById("pixel-change").innerHTML = this.window.pageYOffset + "px";

    decreaseRate = (window.pageYOffset / (verticalHeight - this.window.innerHeight)) * selectedSpeciesMaxDecreaseRate;
    this.document.getElementById("selected-species").innerHTML = selectedSpecies;
    this.document.getElementById("decrease-rate").innerHTML = decreaseRate.toFixed(0) + "%";
});



// Nav Button Interaction 
var airState = false;
var groundState = false;
var waterState = false;
var overlayState = false;

document.addEventListener('click', function (e) {

    if (e.target.id === "air") {
        airState = !airState;
        groundState = false;
        waterState = false;
        
        
        overlayState = true;
        selectedArray = testArray[0]
    }

    if (e.target.id === "ground") {
        airState = false
        groundState = !groundState
        waterState = false
        
        overlayState = true;
        selectedArray = testArray[1]
    }

    if (e.target.id === "water") {
        airState = false
        groundState = false
        waterState = !waterState

        overlayState = true;
        selectedArray = testArray[2]
    }

    if (e.target.id === "home") {
        overlayState = false;
    }

    if(overlayState === true ) {
        document.getElementById("overlay-area").style.display = "block"
    } else {
        document.getElementById("overlay-area").style.display = "none"
    }

    if (airState === true) {
        document.getElementById("air-sub").style.display = "block"
    } else {
        document.getElementById("air-sub").style.display = "none"
    }

    if (groundState === true) {
        document.getElementById("ground-sub").style.display = "block"
    } else {
        document.getElementById("ground-sub").style.display = "none"
    }

    if (waterState === true) {
        document.getElementById("water-sub").style.display = "block"
    } else {
        document.getElementById("water-sub").style.display = "none"
    }


    selectedSpecies = selectedArray.name;
    selectedSpeciesMaxDecreaseRate = selectedArray.maxDecRate;

    decreaseRate = (window.pageYOffset / (verticalHeight - window.innerHeight)) * selectedSpeciesMaxDecreaseRate;
    document.getElementById("selected-species").innerHTML = selectedSpecies;
    document.getElementById("decrease-rate").innerHTML = decreaseRate.toFixed(0) + "%";

    relatedSpeciesArray = selectedArray.relatedSpecies
    relatedSpeciesHTML = displayRelatedSpecies(relatedSpeciesArray)
    document.getElementById("related-species-list").innerHTML = `${relatedSpeciesHTML}`
})



document.addEventListener("mouseover", function (e) {
    if (e.target.id === "bird" || e.target.id === "bird-sub") {
        document.getElementById("bird-sub").style.display = "block"
    }

    if (e.target.id === "bee" || e.target.id === "bee-sub") {
        document.getElementById("bee-sub").style.display = "block"
    }

    if (e.target.id === "tiger" || e.target.id === "tiger-sub") {
        document.getElementById("tiger-sub").style.display = "block"
    }

    if (e.target.id === "ground-species-a" || e.target.id === "ground-species-a-sub") {
        document.getElementById("ground-species-a-sub").style.display = "block"
    }

    if (e.target.id === "ground-species-b" || e.target.id === "ground-species-b-sub") {
        document.getElementById("ground-species-b-sub").style.display = "block"
    }

    if (e.target.id === "ground-species-c" || e.target.id === "ground-species-c-sub") {
        document.getElementById("ground-species-c-sub").style.display = "block"
    }


    if (e.target.id === "water-species-a" || e.target.id === "water-species-a-sub") {
        document.getElementById("water-species-a-sub").style.display = "block"
    }

    if (e.target.id === "water-species-b" || e.target.id === "water-species-b-sub") {
        document.getElementById("water-species-b-sub").style.display = "block"
    }

    if (e.target.id === "water-species-c" || e.target.id === "water-species-c-sub") {
        document.getElementById("water-species-c-sub").style.display = "block"
    }
})

document.addEventListener("mouseout", function (e) {
    if (e.target.id !== "bird" && e.target.id !== "bird-sub") {
        document.getElementById("bird-sub").style.display = "none"
    }

    if (e.target.id !== "bee" && e.target.id !== "bee-sub") {
        document.getElementById("bee-sub").style.display = "none"
    }

    if (e.target.id !== "tiger" && e.target.id !== "tiger-sub") {
        document.getElementById("tiger-sub").style.display = "none"
    }


    if (e.target.id !== "ground-species-a" && e.target.id !== "ground-species-a-sub") {
        document.getElementById("ground-species-a-sub").style.display = "none"
    }

    if (e.target.id !== "ground-species-b" && e.target.id !== "ground-species-b-sub") {
        document.getElementById("ground-species-b-sub").style.display = "none"
    }

    if (e.target.id !== "ground-species-c" && e.target.id !== "ground-species-c-sub") {
        document.getElementById("ground-species-c-sub").style.display = "none"
    }


    if (e.target.id !== "water-species-a" && e.target.id !== "water-species-a-sub") {
        document.getElementById("water-species-a-sub").style.display = "none"
    }

    if (e.target.id !== "water-species-b" && e.target.id !== "water-species-b-sub") {
        document.getElementById("water-species-b-sub").style.display = "none"
    }

    if (e.target.id !== "water-species-c" && e.target.id !== "water-species-c-sub") {
        document.getElementById("water-species-c-sub").style.display = "none"
    }
})