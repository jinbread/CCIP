var degreeChange;
var decreaseRate;
var maxDegree = 3;
var decreaseInput;

// Vertical scroll height. It is changealbe and currently set as 20000px.
var verticalHeight = 20000;

// Selected Species and max decrease rate will be assigned based on user input(click)
var selectedArray;
var selectedSpecies;
var selectedKey;
var descText;
var whatifCase;
var selectedSpeciesPointA;
var selectedSpeciesPointB;
var selectedSpeciesPointC;
var selectedSpeciesPointD;
var selectedSpeciesPointE;
var selectedSpeciesPointF;
var selectedSpeciesPointG;

// Top Nav Bar Interaction 
var navMenuArray;
var insectState = false;
var birdState = false;
var repAmpState = false;
var mammalState = false;
var plantState = false;
var marineState = false;
var anthropoceneState = false;
var overlayState = false;

// Initialize overlay area animation
anime({
    targets: '#overlay-area',
    translateX: 0,
    opacity: 0,
    duration: 0
})

anime({
    targets: '.overlay-wrapper',
    translateY: 40,
})

anime({
    targets: '.popup-center-wrapper',
    translateY: 30,
})

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(JSON.parse(xobj.responseText));
        }
    }
    xobj.send(null);
}

// Call to function with anonymous callback
loadJSON(function (response) {
    navMenuArray = response.species
    categoryArray = response.category
    console.log(categoryArray)

    addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[0]), `${categoryArray[0]}-nav`)
    addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[1]), `${categoryArray[1]}-nav`)
    addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[2]), `${categoryArray[2]}-nav`)
    addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[3]), `${categoryArray[3]}-nav`)
    addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[4]), `${categoryArray[4]}-nav`)
    addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[5]), `${categoryArray[5]}-nav`)
    addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[6]), `${categoryArray[6]}-nav`)

    document.addEventListener('click', function (e) {

        if (e.target.id === "insect") {
            insectState = !insectState
            birdState = false;
            repAmpState = false;
            mammalState = false;
            plantState = false;
            marineState = false;
            anthropoceneState = false;
        }

        if (e.target.id === "bird") {
            insectState = false
            birdState = !birdState;
            repAmpState = false;
            mammalState = false;
            plantState = false;
            marineState = false;
            anthropoceneState = false;
        }

        if (e.target.id === "reptile-and-amphibian") {
            insectState = false
            birdState = false;
            repAmpState = !repAmpState;
            mammalState = false;
            plantState = false;
            marineState = false;
            anthropoceneState = false;
        }

        if (e.target.id === "mammal") {
            insectState = false
            birdState = false;
            repAmpState = false;
            mammalState = !mammalState;
            plantState = false;
            marineState = false;
            anthropoceneState = false;
        }

        if (e.target.id === "plant") {
            insectState = false
            birdState = false;
            repAmpState = false;
            mammalState = false;
            plantState = !plantState;
            marineState = false;
            anthropoceneState = false;
        }

        if (e.target.id === "marine") {
            insectState = false
            birdState = false;
            repAmpState = false;
            mammalState = false;
            plantState = false;
            marineState = !marineState
            anthropoceneState = false;
        }

        if (e.target.id === "anthropocene") {
            insectState = false
            birdState = false;
            repAmpState = false;
            mammalState = false;
            plantState = false;
            marineState = false;
            anthropoceneState = !anthropoceneState;
        }

        if (e.target.id === "home" || e.target.id === "back-btn") {
            overlayState = false;
            insectState = false
            birdState = false;
            repAmpState = false;
            mammalState = false;
            plantState = false;
            marineState = false;
            anthropoceneState = false;
        }

        if (e.target.id === "about") {
            document.getElementById("about-popup").style.display = "block"
            anime({
                targets: ".popup-center-wrapper",
                opacity: 1,
                duration: 1000,
                translateY: 0,
            })
            anime({
                targets: ".bg-wrapper",
                opacity: 1,
                duration: 1000,
            })
        }

        if (e.target.className === "two-depth-nav-item") {
            if (e.target.id === navMenuArray.filter(species => species.id === e.target.id)[0].id) {
                selectedArray = navMenuArray.filter(species => species.id == e.target.id)[0]
                selectedSpecies = selectedArray.string;
                selectedSpeciesPointA = selectedArray.pointA;
                selectedSpeciesPointB = selectedArray.pointB;
                selectedSpeciesPointC = selectedArray.pointC;
                selectedSpeciesPointD = selectedArray.pointD;
                selectedSpeciesPointE = selectedArray.pointE;
                selectedSpeciesPointF = selectedArray.pointF;
                selectedSpeciesPointG = selectedArray.pointG;
                selectedKey = selectedArray.key
                descText = selectedArray.desc;
                whatifCase = selectedArray.whatif

                overlayState = true;
                insectState = false
                birdState = false;
                repAmpState = false;
                mammalState = false;
                plantState = false;
                marineState = false;
                anthropoceneState = false;
            }
        }
        changeNavMenuState(insectState, "insect")
        changeNavMenuState(birdState, "bird")
        changeNavMenuState(repAmpState, "reptile-and-amphibian")
        changeNavMenuState(mammalState, "mammal")
        changeNavMenuState(plantState, "plant")
        changeNavMenuState(marineState, "marine")
        changeNavMenuState(anthropoceneState, "anthropocene")
        changeOverlayState(overlayState)

        decreaseInput = (window.pageYOffset / (verticalHeight - window.innerHeight)) * 100;
        if(degreeChange >= 0 && degreeChange <= 0.5) {
            decreaseRate = decreaseInput * (selectedSpeciesPointB) / 100 * 6
            
        } else if (degreeChange > 0.5 && degreeChange <= 1) {
            decreaseRate = selectedSpeciesPointB + (decreaseInput - 100 / 6 * 1) * (selectedSpeciesPointC - selectedSpeciesPointB) / 100 * 6
        } else if (degreeChange > 1 && degreeChange <= 1.5) {
            decreaseRate = selectedSpeciesPointC + (decreaseInput - 100 / 6 * 2) * (selectedSpeciesPointD - selectedSpeciesPointC) / 100 * 6
        } else if (degreeChange > 1.5 && degreeChange <= 2) {
            decreaseRate = selectedSpeciesPointD + (decreaseInput - 100 / 6 * 3) * (selectedSpeciesPointE - selectedSpeciesPointD) / 100 * 6
        } else if (degreeChange > 2 && degreeChange <= 2.5) {
            decreaseRate = selectedSpeciesPointE + (decreaseInput - 100 / 6 * 4) * (selectedSpeciesPointF - selectedSpeciesPointE) / 100 * 6
        } else if (degreeChange > 2.5) {
            decreaseRate = selectedSpeciesPointF + (decreaseInput - 100 / 6 * 5) * (selectedSpeciesPointG - selectedSpeciesPointF) / 100 * 6
        }
        document.getElementById("selected-species").innerHTML = `of ${selectedSpecies}`;
        document.getElementById("desc-text").innerHTML = descText;
        document.getElementById("decrease-rate").innerHTML = decreaseRate.toFixed(0);

        if (Number(decreaseRate) >= 100) {
            if (whatifCase === true) {
                document.getElementById("whatif-btn").innerHTML = `<button class="btn-large">What if...</button>`;
            } else {
                document.getElementById("whatif-btn").innerHTML = "";
            }
        } else {
            document.getElementById("whatif-btn").innerHTML = "";
        }
    })
});

// Scroll Interaction
window.addEventListener("scroll", function (e) {
    degreeChange = (window.pageYOffset / (verticalHeight - this.window.innerHeight)) * maxDegree;

    document.getElementById("degree-change").innerHTML = Math.floor(degreeChange * 10) / 10;

    decreaseInput = (window.pageYOffset / (verticalHeight - this.window.innerHeight)) * 100;
    if(degreeChange >= 0 && degreeChange <= 0.5) {
        decreaseRate = decreaseInput * (selectedSpeciesPointB) / 100 * 6
        
    } else if (degreeChange > 0.5 && degreeChange <= 1) {
        decreaseRate = selectedSpeciesPointB + (decreaseInput - 100 / 6 * 1) * (selectedSpeciesPointC - selectedSpeciesPointB) / 100 * 6
    } else if (degreeChange > 1 && degreeChange <= 1.5) {
        decreaseRate = selectedSpeciesPointC + (decreaseInput - 100 / 6 * 2) * (selectedSpeciesPointD - selectedSpeciesPointC) / 100 * 6
    } else if (degreeChange > 1.5 && degreeChange <= 2) {
        decreaseRate = selectedSpeciesPointD + (decreaseInput - 100 / 6 * 3) * (selectedSpeciesPointE - selectedSpeciesPointD) / 100 * 6
    } else if (degreeChange > 2 && degreeChange <= 2.5) {
        decreaseRate = selectedSpeciesPointE + (decreaseInput - 100 / 6 * 4) * (selectedSpeciesPointF - selectedSpeciesPointE) / 100 * 6
    } else if (degreeChange > 2.5) {
        decreaseRate = selectedSpeciesPointF + (decreaseInput - 100 / 6 * 5) * (selectedSpeciesPointG - selectedSpeciesPointF) / 100 * 6
    }
    
    this.document.getElementById("selected-species").innerHTML = `of ${selectedSpecies}`;
    this.document.getElementById("decrease-rate").innerHTML = Math.floor(decreaseRate);

    document.getElementById("progress-bar").style.height = (window.pageYOffset / (verticalHeight - this.window.innerHeight)) * 100 + "%"

    if (Number(decreaseRate) >= 100) {
        if (whatifCase === true) {
            document.getElementById("whatif-btn").innerHTML = `<button class="btn-large">What if...</button>`;
        } else {
            document.getElementById("whatif-btn").innerHTML = "";
        }
    } else {
        document.getElementById("whatif-btn").innerHTML = "";
    }

});

function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.remove(element);
}

document.getElementById("explore-btn").addEventListener('click', function (e) {
    anime({
        targets: "#landing-area",
        opacity: 0,
        translateY: -100,
    })
    setTimeout(function () {
        removeElement("landing-area")
        console.log("landing removed")
    }, 500)
})

document.getElementById("privacy-btn").addEventListener('click', function (e) {
    anime({
        targets: "#privacy-popup",
        opacity: 0,
        // translateY: 100,
    })

})



document.getElementById("close-btn").addEventListener('click', function (e) {
    anime({
        targets: ".popup-center-wrapper",
        opacity: 0,
        duration: 1000,
        translateY: 30
    })
    anime({
        targets: ".bg-wrapper",
        opacity: 0,
        duration: 1000,
    })
    setTimeout(function () {
        document.getElementById("about-popup").style.display = "none"
    }, 1000)
})

function addNavMenuItem(objectArray, string) {
    function createNavMenuItemHTML(objectArray) {
        var mapObject = objectArray.map(function (navItem) {
            return `<li class="two-depth-nav-item" id=${navItem.id}>
            <img class="two-depth-nav-item-img" src=\"img/species/${navItem.id}.svg\" alt=\"${navItem.string}\"/>
            <div class="two-depth-nav-item-title">${navItem.string}</div>
            </li>`
        })
        return mapObject.join('')
    }
    var navMenuHTML = createNavMenuItemHTML(objectArray)
    var navMenuWrapper = `<div class="two-depth-nav-wrapper"><ul class="two-depth-nav-list">${navMenuHTML}</ul></div>`
    this.document.getElementById(string).innerHTML = navMenuWrapper
}

function changeNavMenuState(categoryState, category) {
    if (categoryState === true) {
        document.getElementById(`${category}-nav`).style.display = "block"
        document.getElementById(`${category}-nav`).style.pointerEvents = "auto"
        document.getElementById(category).style.opacity = 1
        anime({
            targets: `#${category}-nav`,
            opacity: 1,
            easing: 'easeOutExpo',
            duration: 200
        })
    } else {
        document.getElementById(category).style.opacity = .4
        document.getElementById(`${category}-nav`).style.pointerEvents = "none"
        anime({
            targets: `#${category}-nav`,
            opacity: 0,
            easing: 'easeOutExpo',
            duration: 200,
            complete: function (anim) {
                if (anim.complete === true) {
                    document.getElementById(`#${category}-nav`).style.display = "none"
                }
            }
        })
    }
}

function changeOverlayState(state) {
    if (state === true) {
        document.getElementById("overlay-area").style.display = "block"
        anime({
            targets: '#overlay-area',
            opacity: 1
        })
        anime({
            targets: '.overlay-wrapper',
            translateY: 0,
            easing: 'easeOutExpo',
            duration: 200
        })
    } else {
        anime({
            targets: '.overlay-wrapper',
            translateY: 40,
            easing: 'easeOutExpo',
            duration: 200
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
}