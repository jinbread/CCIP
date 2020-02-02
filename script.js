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

    document.getElementById("progress-bar").style.height = (window.pageYOffset / (verticalHeight - this.window.innerHeight)) * 100 + "%"

});



// Nav Button Interaction 
var airState = false;
var groundState = false;
var marineState = false;
var overlayState = false;

anime({
    targets: '#air-sub',
    translateY: -100,
    opacity: 0,
    duration: 0,
})

anime({
    targets: '#ground-sub',
    translateY: -100,
    opacity: 0,
    duration: 0,
})


anime({
    targets: '#marine-sub',
    translateY: -100,
    opacity: 0,
    duration: 0,
})

anime({
    targets: '#overlay-area',
    translateX: 0,
    opacity: 0,
    duration: 0
})

anime({
    targets: '.overlay-wrapper',
    translateX: -200,
})

anime({
    targets: '#marine-nav',
    opacity: 0
})

document.addEventListener('click', function (e) {
    console.log(e.target.id)

    if (e.target.id === "air") {
        airState = !airState;
        groundState = false;
        marineState = false;
    }

    if (e.target.id === "air-1-1") {
        overlayState = true;
        selectedArray = testArray[0]
        airState = !airState;
    }
    if (e.target.id === "air-1-2") {
        overlayState = true;
        selectedArray = testArray[1]
        airState = !airState;
    }
    if (e.target.id === "air-1-3") {
        overlayState = true;
        selectedArray = testArray[2]
        airState = !airState;
    }



    if (e.target.id === "ground") {
        airState = false
        groundState = !groundState
        marineState = false
    }

    if (e.target.id === "marine") {
        airState = false
        groundState = false
        marineState = !marineState
    }

    if (e.target.id === "marine-fish-cod") {
        overlayState = true;
        selectedArray = testArray[0]
        marineState = !marineState
    }

    if (e.target.id === "home" || e.target.id === "back-btn" ) {
        overlayState = false;
        marineState = false;
        airState = false;
        groundState = false;
    }

    if (overlayState === true) {
        document.getElementById("overlay-area").style.display = "block"
        anime({
            targets: '#overlay-area',
            opacity: 1
        })
        anime({
            targets: '.overlay-wrapper',
            translateX: 0
        })
    } else {
        anime({
            targets: '.overlay-wrapper',
            translateX: -200
        })
        anime({
            targets: '#overlay-area',
            opacity: 0,
            complete: function (anim) {
                if (anim.complete === true) {
                    document.getElementById("overlay-area").style.display = "none"
                }
            }
        })

    }



    // if (airState === true) {
    //     document.getElementById("air-sub").style.display = "block"
    //     document.getElementById("air").style.opacity = 1
    //     anime({
    //         targets: '#air-sub',
    //         translateY: 0,
    //         opacity: 1,
    //         easing: 'easeOutExpo',
    //         duration: 300
    //     })
    // } else {
    //     document.getElementById("air").style.opacity = .4
    //     anime({
    //         targets: '#air-sub',
    //         translateY: -100,
    //         opacity: 0,
    //         easing: 'easeOutExpo',
    //         duration: 300,
    //         complete: function (anim) {
    //             if (anim.complete === true) {
    //                 document.getElementById("air-sub").style.display = "none"

    //             }
    //         }
    //     })
    // }

    // if (groundState === true) {
    //     document.getElementById("ground-sub").style.display = "block"
    //     document.getElementById("ground").style.opacity = 1
    //     anime({
    //         targets: '#ground-sub',
    //         translateY: 0,
    //         opacity: 1,
    //         easing: 'easeOutExpo',
    //         duration: 300
    //     })
    // } else {
    //     document.getElementById("ground").style.opacity = .4
    //     anime({
    //         targets: '#ground-sub',
    //         translateY: -100,
    //         opacity: 0,
    //         easing: 'easeOutExpo',
    //         duration: 300,
    //         complete: function (anim) {
    //             if (anim.complete === true) {
    //                 document.getElementById("ground-sub").style.display = "none"
    //             }
    //         }
    //     })
    // }

    if (marineState === true) {

        document.getElementById("marine-sub").style.display = "block"
        document.getElementById("marine-nav").style.display = "block"
        document.getElementById("marine-nav").style.pointerEvents = "auto"
        document.getElementById("marine").style.opacity = 1
        anime({
            targets: '#marine-sub',
            translateY: 0,
            opacity: 1,
            easing: 'easeOutExpo',
            duration: 300
        })

        anime({
            targets: '#marine-nav',
            opacity: 1,
            easing: 'easeOutExpo',
            duration: 300
        })

    } else {
        document.getElementById("marine").style.opacity = .4
        document.getElementById("marine-nav").style.pointerEvents = "none"
        anime({
            targets: '#marine-sub',
            translateY: -100,
            opacity: 0,
            easing: 'easeOutExpo',
            duration: 300,
            complete: function (anim) {
                if (anim.complete === true) {
                    document.getElementById("marine-sub").style.display = "none"

                }
            }
        })
        anime({
            targets: '#marine-nav',
            opacity: 0,
            easing: 'easeOutExpo',
            duration: 300,
            complete: function (anim) {
                if (anim.complete === true) {
                    document.getElementById("marine-nav").style.display = "none"
                    

                }
            }
        })

    }


    selectedSpecies = selectedArray.name;
    selectedSpeciesMaxDecreaseRate = selectedArray.maxDecRate;

    decreaseRate = (window.pageYOffset / (verticalHeight - window.innerHeight)) * selectedSpeciesMaxDecreaseRate;
    document.getElementById("selected-species").innerHTML = selectedSpecies;
    document.getElementById("decrease-rate").innerHTML = decreaseRate.toFixed(0) + "%";

    relatedSpeciesArray = selectedArray.relatedSpecies
    relatedSpeciesHTML = displayRelatedSpecies(relatedSpeciesArray)
    // document.getElementById("related-species-list").innerHTML = `${relatedSpeciesHTML}`
})








// Code to remove later


// document.addEventListener("mouseover", function (e) {
//     if (e.target.id === "bird" || e.target.id === "bird-sub") {
//         document.getElementById("bird-sub").style.display = "block"
//     }

//     if (e.target.id === "bee" || e.target.id === "bee-sub") {
//         document.getElementById("bee-sub").style.display = "block"
//     }

//     if (e.target.id === "tiger" || e.target.id === "tiger-sub") {
//         document.getElementById("tiger-sub").style.display = "block"
//     }

//     if (e.target.id === "ground-species-a" || e.target.id === "ground-species-a-sub") {
//         document.getElementById("ground-species-a-sub").style.display = "block"
//     }

//     if (e.target.id === "ground-species-b" || e.target.id === "ground-species-b-sub") {
//         document.getElementById("ground-species-b-sub").style.display = "block"
//     }

//     if (e.target.id === "ground-species-c" || e.target.id === "ground-species-c-sub") {
//         document.getElementById("ground-species-c-sub").style.display = "block"
//     }


//     if (e.target.id === "marine-species-a" || e.target.id === "marine-species-a-sub") {
//         document.getElementById("marine-species-a-sub").style.display = "block"
//     }

//     if (e.target.id === "marine-species-b" || e.target.id === "marine-species-b-sub") {
//         document.getElementById("marine-species-b-sub").style.display = "block"
//     }

//     if (e.target.id === "marine-species-c" || e.target.id === "marine-species-c-sub") {
//         document.getElementById("marine-species-c-sub").style.display = "block"
//     }
// })



// document.addEventListener("mouseout", function (e) {
//     if (e.target.id !== "bird" && e.target.id !== "bird-sub") {
//         document.getElementById("bird-sub").style.display = "none"
//     }

//     if (e.target.id !== "bee" && e.target.id !== "bee-sub") {
//         document.getElementById("bee-sub").style.display = "none"
//     }

//     if (e.target.id !== "tiger" && e.target.id !== "tiger-sub") {
//         document.getElementById("tiger-sub").style.display = "none"
//     }


//     if (e.target.id !== "ground-species-a" && e.target.id !== "ground-species-a-sub") {
//         document.getElementById("ground-species-a-sub").style.display = "none"
//     }

//     if (e.target.id !== "ground-species-b" && e.target.id !== "ground-species-b-sub") {
//         document.getElementById("ground-species-b-sub").style.display = "none"
//     }

//     if (e.target.id !== "ground-species-c" && e.target.id !== "ground-species-c-sub") {
//         document.getElementById("ground-species-c-sub").style.display = "none"
//     }


//     if (e.target.id !== "marine-species-a" && e.target.id !== "marine-species-a-sub") {
//         document.getElementById("marine-species-a-sub").style.display = "none"
//     }

//     if (e.target.id !== "marine-species-b" && e.target.id !== "marine-species-b-sub") {
//         document.getElementById("marine-species-b-sub").style.display = "none"
//     }

//     if (e.target.id !== "marine-species-c" && e.target.id !== "marine-species-c-sub") {
//         document.getElementById("marine-species-c-sub").style.display = "none"
//     }
// })