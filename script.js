let user = document.getElementById('username');
let container = document.querySelector('.lower');

async function addContent(data, user) {
    let info = document.createElement('div');
    info.setAttribute('class', 'info');
    info.innerHTML = `<p>Rank : ${data.ranking}</p>
                    <p>User Name : ${user}</p>`;

    let left = document.createElement('div');
    left.setAttribute('class', 'left');
    left.innerHTML = `<div class="circle">
                        <div class="value">
                            <p>${data.totalSolved}/${data.totalQuestions}</p>
                            <p>Solved</p>
                        </div>                   
                      </div>`;

    let circle = left.querySelector('.circle');
    let percentage = ((data.totalSolved / data.totalQuestions) * 100);
    console.log(percentage);
    circle.style.background = `conic-gradient (
                        rgb(48, 209, 54) 0% ${percentage}%
                        )`;

    let right = document.createElement('div');
    right.setAttribute('class', 'right');
    right.innerHTML = `<div class="box easy">
                            <p>Easy</p>
                            <p>${data.easySolved}/${data.totalEasy}</p>
                        </div>
                        <div class="box med">
                            <p>Med.</p>
                            <p>${data.mediumSolved}/${data.totalMedium}</p>                   
                        </div>
                        <div class="box hard">
                            <p>Hard</p>
                            <p>${data.hardSolved}/${data.totalHard}</p>
                        </div>`;
    container.appendChild(info);
    container.appendChild(left);
    container.appendChild(right);

}

async function dataFetch(username) {
    fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`)
        .then((response) => {
            return response.json();
        })
        .then(async (data) => {
            if(data.ranking == undefined)
                document.querySelector('.error').innerHTML = data.errors[0].message;
            else
            {
                document.querySelector('.error').innerHTML = '';
                await addContent(data, username);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

document.querySelector('.btn').addEventListener('click', async () => {
    container.innerHTML = "";
    const username = user.value.trim();
    if(Boolean(username) == false)
    {
        document.querySelector('.error').innerHTML = '';
        document.querySelector('.empty').style.display = 'block';
    }
    else
    {
        document.querySelector('.empty').style.display = 'none';
        await dataFetch(username);
    }
})