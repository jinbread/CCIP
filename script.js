var degreeChange;
var decreaseRate;

// Vertical scroll height. It is changealbe and currently set as 20000px.
var verticalHeight = 20000;

// Selected Species and max decrease rate will be assigned based on user input(click)
var selectedArray;
var selectedSpecies;
var descText;
var whatifCase;
var selectedSpeciesMaxDecreaseRate;

// Top Nav Bar Interaction 
var navMenuArray;
var groundState = false;
var insectState = false;
var marineState = false;
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

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'test.json', true);
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
    // addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[1]), `${categoryArray[1]}-nav`)
    // addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[2]), `${categoryArray[2]}-nav`)
    // addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[3]), `${categoryArray[3]}-nav`)
    // addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[4]), `${categoryArray[4]}-nav`)
    addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[5]), `${categoryArray[5]}-nav`)
    // addNavMenuItem(navMenuArray.filter(species => species.category == categoryArray[6]), `${categoryArray[6]}-nav`)
 
    document.addEventListener('click', function (e) {

        if (e.target.id === "insect") {
            insectState = !insectState
            marineState = false;
        }
        changeNavMenuState(insectState, "insect")

        if (e.target.id === "marine") {
            insectState = false;
            marineState = !marineState
        }
        changeNavMenuState(marineState, "marine")

        if (e.target.id === "home" || e.target.id === "back-btn") {
            overlayState = false;
            insectState = false;
            marineState = false;
        }
        changeOverlayState(overlayState)

        if (e.target.className === "two-depth-nav-item") {
            if (e.target.id === navMenuArray.filter(species => species.id === e.target.id)[0].id) {
                selectedArray = navMenuArray.filter(species => species.id == e.target.id)[0]
                selectedSpecies = selectedArray.string;
                selectedSpeciesMaxDecreaseRate = selectedArray.maxDecRate;
                descText = selectedArray.desc;
                whatifCase = selectedArray.whatif

                overlayState = true;
                insectState = false;
                marineState = false;
            }
        }
        changeNavMenuState(insectState, "insect")
        changeNavMenuState(marineState, "marine")
        changeOverlayState(overlayState)

        decreaseRate = (window.pageYOffset / (verticalHeight - window.innerHeight)) * selectedSpeciesMaxDecreaseRate;
        document.getElementById("selected-species").innerHTML = `of ${selectedSpecies}`;
        document.getElementById("desc-text").innerHTML = descText;
        document.getElementById("decrease-rate").innerHTML = decreaseRate.toFixed(0) + "%";

        if (Math.floor(degreeChange * 10) / 10 > 1.9) {
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
    degreeChange = (window.pageYOffset / (verticalHeight - this.window.innerHeight)) * 2;

    document.getElementById("degree-change").innerHTML = Math.floor(degreeChange * 10) / 10;
    // Set for scroll pixel debugging. 
    // console.log("page Y Offset: " + this.window.pageYOffset)

    decreaseRate = (window.pageYOffset / (verticalHeight - this.window.innerHeight)) * selectedSpeciesMaxDecreaseRate;
    this.document.getElementById("selected-species").innerHTML = `of ${selectedSpecies}`;
    this.document.getElementById("decrease-rate").innerHTML = Math.floor(decreaseRate) + "%";

    document.getElementById("progress-bar").style.height = (window.pageYOffset / (verticalHeight - this.window.innerHeight)) * 100 + "%"

    if (Math.floor(degreeChange * 10) / 10 > 1.9) {
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

function addNavMenuItem(objectArray, string) {
    function createNavMenuItemHTML(objectArray) {
        var mapObject = objectArray.map(function (navItem) {
            return `<li class="two-depth-nav-item" id=${navItem.id}>
            <img class="two-depth-nav-item-img" src=\"img/${navItem.id}.png\" alt=${navItem.string}/>
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
        // console.log("run close anim")
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