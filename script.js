const cont = document.querySelector('.bars_container');
const newArray = document.querySelector('#random_array')
const sort = document.querySelector('#sort')
const sizeSlider = document.getElementById('size_slider')
const speedSlider = document.getElementById('speed_slider')
const algo = document.getElementById('algo') 

let min = 1; 
let max = 20;
let numOfBars = parseInt(sizeSlider.value);//slider ko size 
let array = new Array(numOfBars);
let delay = parseInt(speedSlider.value);//speed
let algoUsed = "";

//creates new random array
newArray.addEventListener('click', function(){
    createArray();
    cont.textContent = ''//yeh bars ko ek particular limit mei rehne ke liye kiya gya hai
    displayBars(array)
})

//slider to change array size
sizeSlider.addEventListener("input", function () {
    numOfBars = sizeSlider.value;
    cont.innerHTML = "";
    createArray();
    displayBars(array);
  });

//slider to change speed 
speedSlider.addEventListener("input", function () {
   delay = 210 - parseInt(speedSlider.value);//210 speed hai jis speed mei bars ki sorting horhi//sorting ko delay taaki visualization dikhe
  });

//choose the required algorithm
algo.addEventListener('change', () =>{
    algoUsed = algo.value;
})

function createArray()
{
    for(let i=0; i<numOfBars; i++)
    {
        //generate a random number and store it in the array
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        array[i] = randomNum;
    }
}

//array is created and bars are rendered when dom is loaded
document.addEventListener("DOMContentLoaded", function() {//jab v page kholo ya refresh karo toh bars ko load karega
    createArray()
    displayBars(array)
})

//display bars based on array size
function displayBars(array){
    for(let i=0; i<numOfBars; i++)
    {
        const bar = document.createElement('div')
        bar.classList.add('bar');
        bar.style.height = array[i] * 15 + "px";
        cont.appendChild(bar);
    }
}

//function to set timeout
function sleep(ms)
{// the main purpose fo promise is to execute code parallely 
    return new Promise((resolve) => setTimeout(resolve,ms));
}//agar hum sleep-promise use ni karenge toh sleep function ke niche likhe gaye saare code execute hojaayenge

//const bars = document.getElementsByClassName('bar')
//implement bubblesort algo

//hum kisi v function ko async bana skte hai aur usme promise ko implement kar skte hai
async function bubbleSort(arr)
{
    const bars = document.getElementsByClassName('bar')
    for(let i = 0; i<arr.length; i++)
    {
        for(let j = 0; j<numOfBars - i - 1; j++)
        { 
            if(arr[j] > arr[j+1])
            {
                let temp;
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                bars[j].style.height = arr[j] * 15 + "px"
                bars[j].style.backgroundColor = "rgb(207, 70, 70)"
                bars[j+1].style.height = arr[j+1] * 15 + "px"  
                bars[j+1].style.backgroundColor = "rgb(207, 70, 70)"
                await sleep(delay)
            }
            bars[j].style.backgroundColor = "rgb(90, 167, 244)"
            bars[j+1].style.backgroundColor = "rgb(90, 167, 244)" 
            await sleep(delay)
        }
        bars[numOfBars-i-1].style.backgroundColor = 'lightGreen'//hojaane ke baad
        
    }
}

//implement insertion sort algo
async function insertionSort(arr)
{
    const bars = document.getElementsByClassName('bar')
    for(let i = 1; i<numOfBars; i++)
    {
        let temp = arr[i];
        let j = i - 1;
        for(; j>=0; j--)
        { 
            if(arr[j] > temp)
            {
                arr[j+1] = arr[j]
                bars[j+1].style.height = arr[j+1] * 15 + "px"  
                //yellow and red denote the positions where the shift is happening
                bars[j].style.backgroundColor = "yellow"
                bars[j+1].style.backgroundColor = "rgb(207, 70, 70)"
                await sleep(delay)
            }
            else{
                break;
            }
            bars[j].style.backgroundColor = "rgb(90, 167, 244)"
            bars[j+1].style.backgroundColor = "rgb(90, 167, 244)" 
            await sleep(delay)
        }
        arr[j+1] = temp;
        bars[j+1].style.height = arr[j+1] * 15 + "px" 
        }
}

//implemented selection sort algo
async function selectionSort(arr)
{
    const bars = document.getElementsByClassName('bar')
    let i,j,min;
    for(i = 0; i<numOfBars; i++)
    {
        min = i; 
        for(j = i+1; j<numOfBars; j++)
        { 
            if(arr[j] < arr[min])
            {
                min = j;
            }
        }
        if(min!=i)
            {
                //swap (red colour denotes the position of swap)
                [arr[i],arr[min]] = [arr[min],arr[i]]
                bars[i].style.height = arr[i] * 15 + "px"  
                bars[i].style.backgroundColor = "rgb(207, 70, 70)"
                bars[min].style.height = arr[min] * 15 + "px"  
                bars[min].style.backgroundColor = "rgb(207, 70, 70)"
                await sleep(delay)
            }
            bars[i].style.backgroundColor = "rgb(90, 167, 244)"
            bars[min].style.backgroundColor = "rgb(90, 167, 244)" 
            await sleep(delay)    
            bars[i].style.backgroundColor = "lightGreen"
    }
    
}

//merge sort 

async function merge(arr,s,e)
{
    const bars = document.getElementsByClassName('bar')
    let mid =  s + parseInt((e-s)/2);//mid nikalne ke liye bars ke size ko int mei convert kiya 

    let len1 = mid - s + 1;
    let len2 = e - mid;

    let arr1 = new Array(len1)
    let arr2 = new Array(len2)

    let k = s;
    for(let i=0; i<len1; i++)
    {
        arr1[i] = arr[k++];
    }

    for(let j=0; j<len2; j++)
    {
        arr2[j] = arr[k++]
    }

    k = s;
    let i=0;
    let j=0;

    while(i < len1 && j < len2)
    {
        bars[k].style.backgroundColor = "rgb(207, 70, 70)"
        if(arr1[i] < arr2[j])
        {
            arr[k] = arr1[i];
            bars[k].style.height = arr[k] * 15 + 'px';
            
            i++;
            k++;
        }
        else{
            arr[k] = arr2[j];
            bars[k].style.height = arr[k] * 15 + 'px';
            k++;
            j++;
        }
        await sleep(delay)
    }

    while(i<len1)
    {
        bars[k].style.backgroundColor = "rgb(207, 70, 70)"
        arr[k] = arr1[i];
        bars[k].style.height = arr[k] * 15 + 'px';
        i++;
        k++;
        await sleep(delay)
    }

    while(j<len2)
    {
        bars[k].style.backgroundColor = "rgb(207, 70, 70)"
        arr[k] = arr2[j];
        bars[k].style.height = arr[k] * 15 + 'px';
        j++;
        k++;
        await sleep(delay)
    }

    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "rgb(90, 167, 244)";
    }
}

async function mergeSort(arr,s,e)
{
    if(s>=e)
    {
        return;
    }
    
    let mid =  s + parseInt((e-s)/2);


    await mergeSort(arr,s,mid);
    await mergeSort(arr,mid+1,e);

    await merge(arr,s,e);
}

/*async function merge(arr, s, e) {
    console.log("merge");
    let bar = document.getElementsByClassName("bar");
  
    let mid = s + parseInt((e-s)/2)
    let left = new Array(mid - s + 1);
    let right = new Array(e - mid);
  
    // left.forEach((element, index) => {
    //   element = arr[s + index];
    // });
  
    // right.forEach((element, index) => {
    //   element = arr[mid + 1 + index];
    // });
  
    for (let i = 0; i < left.length; i++) {
      left[i] = arr[s + i];
    }
    for (let i = 0; i < right.length; i++) {
      right[i] = arr[mid + i + 1];
    }
  
    let i = s;
    let k = 0;
    let j = 0;
    while (j < left.length && k < right.length) {
      bar[i].style.backgroundColor = "yellow";
  
      if (left[j] < right[k]) {
        arr[i] = left[j];
        bar[i].style.height = arr[i] * 15 + "px";
        // bar[i].style.backgroundColor = "yellow";
  
        // console.log("while");
  
        j++;
        i++;
      } else {
        arr[i] = right[k];
        bar[i].style.height = arr[i] * 15 + "px";
  
        i++;
        k++;
      }
  
      await sleep(delay);
    }
  
    while (j < left.length) {
      bar[i].style.backgroundColor = "yellow";
  
      arr[i] = left[j];
      bar[i].style.height = arr[i] * 15 + "px";
  
      j++;
      i++;
      await sleep(delay);
    }
    while (k < right.length) {
      bar[i].style.backgroundColor = "yellow";
  
      arr[i] = right[k];
      bar[i].style.height = arr[i] * 15 + "px";
  
      k++;
      i++;
      await sleep(delay);
    }
  

    for (let k = 0; k < bar.length; k++) {
      bar[k].style.backgroundColor = "aqua";
    }
  }

  async function mergeSort(arr, s, e) {
    if (s < e) {
      // console.log(s + " ");
      let mid = s + parseInt((e - s) / 2);
      // let mid = parseInt((s + e) / 2);
      await mergeSort(arr, s, mid);
      await mergeSort(arr, mid + 1, e);
  
      await merge(arr, s, e, mid);
    }
  }*/
sort.addEventListener('click' , function(){
    switch(algoUsed) {
        case("bubble") :
            bubbleSort(array);
            break;
        case("insertion"):
            insertionSort(array);
            break;
        case("selection"):
            selectionSort(array);
            break;
        case("merge"):
            mergeSort(array,0,numOfBars-1);
            break;
        default:
            bubbleSort(array);
            break;
    }
})