
window.onload = function () {

    // funtion for calling the list of all breeeds of dogs in the 'Breed' dropdown

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://dog.ceo/api/breeds/list/all');

    xhr.send()

    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log(xhr.response)

            var dataBreed = JSON.parse(xhr.response)
            console.log(Object.keys(dataBreed.message))

            var select = document.getElementById('select1')

            select.addEventListener('change', selectSubBreed)   //calling the function selectSubBreed to show subbreeds

            for (i = 0; i < Object.keys(dataBreed.message).length; i++) {
                var options = document.createElement('option')
                select.appendChild(options)
                options.textContent = Object.keys(dataBreed.message)[i]
                options.setAttribute('value', options.textContent)

            }
        }
        else {
            console.log("Error Code is:" + xhr.status)
        }

    }

}

// function for showing the showing the sub breeds in the 'Sub Breed' dropdown, according to the respective breeds
function selectSubBreed() {

    var xhr = new XMLHttpRequest();

    var selOption = document.getElementById('select1').value

    xhr.open('GET', 'https://dog.ceo/api/breed/' + selOption + '/list')
    console.log(selOption)

    xhr.send()

    xhr.onload = function () {
        if (xhr.status == 200) {
            // console.log(xhr.response)

            var dataSubBreed = JSON.parse(xhr.response)
            // console.log(Object.keys(dataSubBreed.message))
            // console.log(dataSubBreed)

            var select2 = document.getElementById('select2')

            if ((dataSubBreed.message).length > 0) {
                for (i = 0; i < Object.keys(dataSubBreed.message).length; i++) {
                    var option2 = document.createElement('option')
                    select2.appendChild(option2)
                    option2.textContent = dataSubBreed.message[i]
                }
            }
            else {
                select2.innerHTML = ''

            }


        }
        else {
            console.log("Error Code is:" + xhr.status)
        }
    }
}


//function to show a image of dog of the selected breed/subreed on clicking 'Fetch Image' button
function fetch() {

    var xhr = new XMLHttpRequest();

    var selOption1 = document.getElementById('select1').value
    var selOption2 = document.getElementById('select2').value


    if (selOption2.length > 0) {

        xhr.open('GET', 'https://dog.ceo/api/breed/' + selOption1 + '/' + selOption2 + '/images/random')
    }
    else {
        xhr.open('GET', 'https://dog.ceo/api/breed/' + selOption1 + '/images/random')
    }

    xhr.send()
    xhr.onload = function () {
        if (xhr.status == 200) {

            var dataImage = JSON.parse(xhr.response)
            console.log(dataImage)
            console.log(dataImage.message)

            var selDiv = document.getElementById('pic')

            selDiv.innerHTML = ''

            var images = document.createElement('img')
            selDiv.appendChild(images)
            images.setAttribute('src', dataImage.message)
            images.setAttribute('class', 'size mx-auto d-block img-fluid')

        }

    }

}

