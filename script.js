var degreeChange;
var decreaseRate;
var maxDegree = 3;
var decreaseInput;

// Vertical scroll height. It is changealbe and currently set as 20000px.
var verticalHeight = 20000;

// Selected Species and max decrease rate will be assigned based on user input(click)
var selectedArray = [];
var selectedKey;

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
var whatifState = false;
var aboutState = false;

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

    addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[0]), `${categoryArray[0]}-nav`)
    addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[1]), `${categoryArray[1]}-nav`)
    addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[2]), `${categoryArray[2]}-nav`)
    addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[3]), `${categoryArray[3]}-nav`)
    addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[4]), `${categoryArray[4]}-nav`)
    addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[5]), `${categoryArray[5]}-nav`)
    addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[6]), `${categoryArray[6]}-nav`)
    addWhatifItem(navMenuArray.filter(species => species.whatif === true), "scroll-end-whatif")

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
            console.log("back")
        }

        // console.log(e.target.className);

        if (e.target.className === "two-depth-nav-item") {
            if (e.target.id === navMenuArray.filter(species => species.id === e.target.id)[0].id) {
                selectedArray = navMenuArray.filter(species => species.id == e.target.id)[0]
                selectedSpecies = selectedArray.string;
                selectedKey = selectedArray.key

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

        decreaseInput = ((window.pageYOffset / (verticalHeight - window.innerHeight)) * 100).toFixed(2);
        if (degreeChange >= 0 && degreeChange <= 0.5) {
            decreaseRate = decreaseInput * (selectedArray.pointB) / 100 * 6

        } else if (degreeChange > 0.5 && degreeChange <= 1) {
            decreaseRate = selectedArray.pointB + (decreaseInput - 100 / 6 * 1) * (selectedArray.pointC - selectedArray.pointB) / 100 * 6
        } else if (degreeChange > 1 && degreeChange <= 1.5) {
            decreaseRate = selectedArray.pointC + (decreaseInput - 100 / 6 * 2) * (selectedArray.pointD - selectedArray.pointC) / 100 * 6
        } else if (degreeChange > 1.5 && degreeChange <= 2) {
            decreaseRate = selectedArray.pointD + (decreaseInput - 100 / 6 * 3) * (selectedArray.pointE - selectedArray.pointD) / 100 * 6
        } else if (degreeChange > 2 && degreeChange <= 2.5) {
            decreaseRate = selectedArray.pointE + (decreaseInput - 100 / 6 * 4) * (selectedArray.pointF - selectedArray.pointE) / 100 * 6
        } else if (degreeChange > 2.5) {
            decreaseRate = selectedArray.pointF + (decreaseInput - 100 / 6 * 5) * (selectedArray.pointG - selectedArray.pointF) / 100 * 6
        }
        document.getElementById("selected-species").innerHTML = `of ${selectedArray.string}`;
        document.getElementById("desc-text").innerHTML = selectedArray.desc;
        document.getElementById("decrease-rate").innerHTML = decreaseRate.toFixed(0);

        //what if 
        if (selectedArray.whatif === true) {
            document.getElementById("whatif-btn").style.display = "block"
            document.getElementById("whatif-popup-img").innerHTML = `<img src=\"img/whatif/${selectedArray.id}.png\" class="whatif-img" alt=\"${selectedArray.string}\">`;
            document.getElementById("whatif-popup-content-title").innerHTML = selectedArray.whatifTitle;
            document.getElementById("whatif-popup-content-text").innerHTML = selectedArray.whatifDesc;
        } else {
            document.getElementById("whatif-btn").style.display = "none"
        }

        if (overlayState == false) {
            document.getElementById("scroll-end-popup").style.display = "block"
            document.getElementById("scroll-end-popup").style.opacity = (degreeChange - 2.8) * 5
        } else {
            document.getElementById("scroll-end-popup").style.display = "none"
        }
    })
});

// Scroll Interaction
var scheduledAnimationFrame;

function readAndUpdatePage() {
    console.log('render');
    scheduledAnimationFrame = false;

    degreeChange = ((window.pageYOffset / (verticalHeight - this.window.innerHeight)) * maxDegree).toFixed(2);

    if (overlayState == false && this.window.pageYOffset >= 18500) {
        this.document.getElementById("scroll-end-popup").style.display = "block"
        this.document.getElementById("scroll-end-popup").style.opacity = (this.window.pageYOffset - 18500) / 500
    } else {
        this.document.getElementById("scroll-end-popup").style.display = "none"
    }

    document.getElementById("degree-change").innerHTML = Math.floor(degreeChange * 10) / 10;

    decreaseInput = (window.pageYOffset / (verticalHeight - this.window.innerHeight)) * 100;
    if (degreeChange >= 0 && degreeChange <= 0.5) {
        decreaseRate = decreaseInput * (selectedArray.pointB) / 100 * 6

    } else if (degreeChange > 0.5 && degreeChange <= 1) {
        decreaseRate = selectedArray.pointB + (decreaseInput - 100 / 6 * 1) * (selectedArray.pointC - selectedArray.pointB) / 100 * 6
    } else if (degreeChange > 1 && degreeChange <= 1.5) {
        decreaseRate = selectedArray.pointC + (decreaseInput - 100 / 6 * 2) * (selectedArray.pointD - selectedArray.pointC) / 100 * 6
    } else if (degreeChange > 1.5 && degreeChange <= 2) {
        decreaseRate = selectedArray.pointD + (decreaseInput - 100 / 6 * 3) * (selectedArray.pointE - selectedArray.pointD) / 100 * 6
    } else if (degreeChange > 2 && degreeChange <= 2.5) {
        decreaseRate = selectedArray.pointE + (decreaseInput - 100 / 6 * 4) * (selectedArray.pointF - selectedArray.pointE) / 100 * 6
    } else if (degreeChange > 2.5) {
        decreaseRate = selectedArray.pointF + (decreaseInput - 100 / 6 * 5) * (selectedArray.pointG - selectedArray.pointF) / 100 * 6
    }

    this.document.getElementById("selected-species").innerHTML = `of ${selectedArray.string}`;
    this.document.getElementById("decrease-rate").innerHTML = Math.floor(decreaseRate);

    document.getElementById("progress-bar").style.height = (window.pageYOffset / (verticalHeight - this.window.innerHeight)) * 100 + "%"

}

function onScroll(e) {
    // Store the scroll value for laterz.
    lastScrollY = window.scrollY;

    // Prevent multiple rAF callbacks.
    if (scheduledAnimationFrame) {
        return;
    }

    scheduledAnimationFrame = true;
    requestAnimationFrame(readAndUpdatePage);
}

window.addEventListener("scroll", onScroll);

// Popup events
document.getElementById("about").addEventListener('click', function (e) {
    aboutState = true;
    popupAnimation(aboutState, "about-popup")
})

document.getElementById("about-close-btn").addEventListener('click', function (e) {
    aboutState = false;
    popupAnimation(aboutState, "about-popup")
})

document.getElementById("whatif-btn").addEventListener('click', function (e) {
    whatifState = true;
    popupAnimation(whatifState, "whatif-popup")
})

document.getElementById("whatif-close-btn").addEventListener('click', function (e) {
    whatifState = false;
    popupAnimation(whatifState, "whatif-popup")
})

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
    })

})

function addNavMenuItem(objectArray, string) {
    function createNavMenuItemHTML(objectArray) {
        var mapObject = objectArray.map(function (navItem) {
            return `<li class="two-depth-nav-item" id=${navItem.id}>
            <img class="two-depth-nav-item-img" src=\"img/species/${navItem.id}.svg\" alt=\"${navItem.string}\"/>
            <div class="two-depth-nav-item-title">${navItem.string}</div>
            ${(navItem.whatif ? "<div class=\"two-depth-nav-item-whatif\">What if</div>" : "")}
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

function popupAnimation(state, id) {
    if (state === true) {
        document.getElementById(id).style.display = "block"
        anime({
            targets: `#${id} .popup-center-wrapper`,
            opacity: 1,
            duration: 1000,
            translateY: 0,
        })
        anime({
            targets: `#${id} .bg-wrapper`,
            opacity: 1,
            duration: 1000,
        })
        console.log("Opening Pop-up animation done")
    } else {
        anime({
            targets: `#${id} .popup-center-wrapper`,
            opacity: 0,
            duration: 1000,
            translateY: 30
        })
        anime({
            targets: `#${id} .bg-wrapper`,
            opacity: 0,
            duration: 1000,
        })
        setTimeout(function () {
            document.getElementById(id).style.display = "none"
        }, 1000)
        console.log("Closing Pop-up animation done")
    }
}


function changeOverlayState(state) {
    if (state === true) {
        document.getElementById("overlay-area").style.display = "block"
        anime({
            targets: '#overlay-area',
            opacity: 1,
        })
        anime({
            targets: '.overlay-wrapper',
            translateY: 0,
            easing: 'easeOutExpo',
            duration: 200
        })
        console.log("Opening overlay animation done")
    } else if (state === false) {
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
        console.log("Closing overlay animation done")

    }
}

function addWhatifItem(objectArray, string) {
    function openWhatifPopup(whatifSpecies) {
        whatifID = whatifSpecies + "-whatif"
        document.getElementById(whatifID).addEventListener("click", function () {
            selectedArray = navMenuArray.filter(species => species.id === whatifSpecies)[0]
            whatifState = true;
            popupAnimation(whatifState, "whatif-popup")
        })
    }   

    function createWhatifItemHTML(objectArray) {
        var mapObject = objectArray.map(function (navItem) {
            return `<div class="scroll-end-icons-item">
            <img src=\"img/species/${navItem.id}.svg\" alt=\"${navItem.string}\" id="${navItem.id}-whatif"/>
            </div>`
        })
        return mapObject.join('')
    }

    var whatifItemHTML = createWhatifItemHTML(objectArray)
    this.document.getElementById(string).innerHTML = whatifItemHTML

    objectArray.map(function (item) {
        return openWhatifPopup(item.id)
    })
}