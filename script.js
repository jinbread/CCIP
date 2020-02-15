function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'test.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init() {
    loadJSON(function (response) {
        // Parse JSON string into object
        var actual_JSON = JSON.parse(response);
    });
}


init()

// Seperate array to json file
var testArray = [{
        name: "Atlantic Mackereel",
        maxDecRate: 40,
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        whatif: true,
    },
    {
        name: "Blue Whitning",
        maxDecRate: 100,
        desc: "Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.",
        whatif: false,
    },
    {
        name: "Species Three",
        maxDecRate: 70,
    }
]

var navMenuArray = {
    marine: [{
            id: "blue-whitning",
            string: "Blue Whitning",
            img: "../images/nav/marine/blue-whitning.png"
        },
        {
            id: "atlantic-mackereel",
            string: "Atlantic Mackereel",
            img: "../images/nav/marine/atlantic-mackereel.png"
        },
        {
            id: "blue-whitning",
            string: "Blue Whitning",
            img: "../images/nav/marine/blue-whitning.png"
        },
        {
            id: "atlantic-mackereel",
            string: "Atlantic Mackereel",
            img: "../images/nav/marine/atlantic-mackereel.png"
        },
        {
            id: "blue-whitning",
            string: "Blue Whitning",
            img: "../images/nav/marine/blue-whitning.png"
        },
        {
            id: "atlantic-mackereel",
            string: "Atlantic Mackereel",
            img: "../images/nav/marine/atlantic-mackereel.png"
        },
        {
            id: "blue-whitning",
            string: "Blue Whitning",
            img: "../images/nav/marine/blue-whitning.png"
        },
        {
            id: "atlantic-mackereel",
            string: "Atlantic Mackereel",
            img: "../images/nav/marine/atlantic-mackereel.png"
        },
        {
            id: "blue-whitning",
            string: "Blue Whitning",
            img: "../images/nav/marine/blue-whitning.png"
        },
        {
            id: "atlantic-mackereel",
            string: "Atlantic Mackereel",
            img: "../images/nav/marine/atlantic-mackereel.png"
        },
        {
            id: "blue-whitning",
            string: "Blue Whitning",
            img: "../images/nav/marine/blue-whitning.png"
        },
        {
            id: "atlantic-mackereel",
            string: "Atlantic Mackereel",
            img: "../images/nav/marine/atlantic-mackereel.png"
        },
        {
            id: "blue-whitning",
            string: "Blue Whitning",
            img: "../images/nav/marine/blue-whitning.png"
        },
        {
            id: "atlantic-mackereel",
            string: "Atlantic Mackereel",
            img: "../images/nav/marine/atlantic-mackereel.png"
        },
        {
            id: "blue-whitning",
            string: "Blue Whitning",
            img: "../images/nav/marine/blue-whitning.png"
        },
        {
            id: "atlantic-mackereel",
            string: "Atlantic Mackereel",
            img: "../images/nav/marine/atlantic-mackereel.png"
        },
    ],
    ground: [{
            id: "random-species",
            string: "Random Species",
            img: "../images/nav/marine/random-species.png"
        },
        {
            id: "something-something",
            string: "Something Something",
            img: "../images/nav/marine/something-something.png"
        },
        {
            id: "random-species",
            string: "Random Species",
            img: "../images/nav/marine/random-species.png"
        },
        {
            id: "something-something",
            string: "Something Something",
            img: "../images/nav/marine/something-something.png"
        },
        {
            id: "random-species",
            string: "Random Species",
            img: "../images/nav/marine/random-species.png"
        },
        {
            id: "something-something",
            string: "Something Something",
            img: "../images/nav/marine/something-something.png"
        },
        {
            id: "random-species",
            string: "Random Species",
            img: "../images/nav/marine/random-species.png"
        },
        {
            id: "something-something",
            string: "Something Something",
            img: "../images/nav/marine/something-something.png"
        },
        {
            id: "random-species",
            string: "Random Species",
            img: "../images/nav/marine/random-species.png"
        },
        {
            id: "something-something",
            string: "Something Something",
            img: "../images/nav/marine/something-something.png"
        },
        {
            id: "random-species",
            string: "Random Species",
            img: "../images/nav/marine/random-species.png"
        },
        {
            id: "something-something",
            string: "Something Something",
            img: "../images/nav/marine/something-something.png"
        },
        {
            id: "random-species",
            string: "Random Species",
            img: "../images/nav/marine/random-species.png"
        },
        {
            id: "something-something",
            string: "Something Something",
            img: "../images/nav/marine/something-something.png"
        },
    ]

}



var degreeChange;
var decreaseRate;

// Vertical scroll height. It is changealbe and currently set as 20000px.
var verticalHeight = 20000;

// Selected Species and max decrease rate will be assigned based on user input(click)
var selectedArray = testArray[0]
var selectedSpecies = selectedArray.name
var descText = selectedArray.desc
var whatifCase = selectedArray.whatif
var selectedSpeciesMaxDecreaseRate = selectedArray.maxDecRate

function removeElement(elementId) {
    // Removes an element from the document.
    var element = document.getElementById(elementId);
    element.remove(element);
}

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



// Nav Button Interaction 
var airState = false;
var groundState = false;
var marineState = false;
var overlayState = false;

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

document.addEventListener('click', function (e) {
    // console.log(e.target.id)

    if (e.target.id === "explore-btn") {
        anime({
            targets: "#landing-area",
            opacity: 0,
            translateY: -100,
        })
        setTimeout(function () {
            removeElement("landing-area")
            console.log("landing removed")
        }, 500)

    }

    if (e.target.id === "marine") {
        airState = false
        groundState = false
        marineState = !marineState
    }

    if (e.target.id === "ground") {
        airState = false
        marineState = false
        groundState = !groundState
    }

    if (e.target.id === "atlantic-mackereel") {
        overlayState = true;
        selectedArray = testArray[0]
        marineState = !marineState
    }

    if (e.target.id === "blue-whitning") {
        console.log("what?")
        overlayState = true;
        selectedArray = testArray[1]
        marineState = !marineState
    }

    if (e.target.id === "home" || e.target.id === "back-btn") {
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

    if (marineState === true) {
        document.getElementById("marine-nav").style.display = "block"
        document.getElementById("marine-nav").style.pointerEvents = "auto"
        document.getElementById("marine").style.opacity = 1
        anime({
            targets: '#marine-nav',
            opacity: 1,
            easing: 'easeOutExpo',
            duration: 200
        })

    } else {
        document.getElementById("marine").style.opacity = .4
        document.getElementById("marine-nav").style.pointerEvents = "none"
        anime({
            targets: '#marine-nav',
            opacity: 0,
            easing: 'easeOutExpo',
            duration: 200,
            complete: function (anim) {
                if (anim.complete === true) {
                    document.getElementById("marine-nav").style.display = "none"
                }
            }
        })

    }

    if (groundState === true) {
        document.getElementById("ground-nav").style.display = "block"
        document.getElementById("ground-nav").style.pointerEvents = "auto"
        document.getElementById("ground").style.opacity = 1
        anime({
            targets: '#ground-nav',
            opacity: 1,
            easing: 'easeOutExpo',
            duration: 200
        })

    } else {
        document.getElementById("ground").style.opacity = .4
        document.getElementById("ground-nav").style.pointerEvents = "none"
        anime({
            targets: '#ground-nav',
            opacity: 0,
            easing: 'easeOutExpo',
            duration: 200,
            complete: function (anim) {
                if (anim.complete === true) {
                    document.getElementById("ground-nav").style.display = "none"
                }
            }
        })

    }

    selectedSpecies = selectedArray.name;
    selectedSpeciesMaxDecreaseRate = selectedArray.maxDecRate;
    descText = selectedArray.desc;
    whatifCase = selectedArray.whatif

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

document.addEventListener("mouseover", function (e) {
    // console.log(e.target.id)

})

document.addEventListener("mouseleave", function (e) {
    // console.log(e.target.id)
})






function addNavMenuItem(objectArray, string) {
    function createNavMenuItemHTML(objectArray) {
        var mapObject = objectArray.map(function (navItem) {
            return `<li class="two-depth-nav-item" id=${navItem.id}>
            <img class="two-depth-nav-item-img" src=${navItem.img} alt=${navItem.string}/>
            <div class="two-depth-nav-item-title">${navItem.string}</div>
            </li>`
        })
        return mapObject.join('')
    }
    var navMenuHTML = createNavMenuItemHTML(objectArray)
    var navMenuWrapper = `<div class="two-depth-nav-wrapper"><ul class="two-depth-nav-list">${navMenuHTML}</ul></div>`
    this.document.getElementById(string).innerHTML = navMenuWrapper
}

addNavMenuItem(navMenuArray.marine, "marine-nav")
addNavMenuItem(navMenuArray.ground, "ground-nav")