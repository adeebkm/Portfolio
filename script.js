const mCircle=document.querySelector('.mcircle');
const mDot=document.querySelector('.mdot');

let mouseCircleBool=true;

//mouse mCircle
const mCircleFn=(x,y)=>{
  mouseCircleBool&&
    (mCircle.style.cssText= `top: ${y}px; left: ${x}px; opacity: 1;`);


    mDot.style.cssText= `top: ${y}px; left: ${x}px; opacity: 1;`;
};


const circles =document.querySelectorAll('.circle');
const mainImg=document.querySelector('.maincircle img');

let mX=0;
let mY=0;
const z=100;
const animateCircles = (e, x, y) => {
  if (x < mX) {
    circles.forEach((circle) => {
      circle.style.left = `${z}px`;
    });
    mainImg.style.left = `${z}px`;
  } else if (x > mX) {
    circles.forEach((circle) => {
      circle.style.left = `-${z}px`;
    });
    mainImg.style.left = `-${z}px`;
  }

  if (y < mY) {
    circles.forEach((circle) => {
      circle.style.top = `${z}px`;
    });
    mainImg.style.top = `${z}px`;
  } else if (y > mY) {
    circles.forEach((circle) => {
      circle.style.top = `-${z}px`;
    });
    mainImg.style.top = `-${z}px`;
  }

  mX = e.clientX;
  mY = e.clientY;
};

let hoveredElPosition=[];

const stickyElement = (x, y, hoveredEl) => {
  // Sticky Element
  if (hoveredEl.classList.contains("sticky")) {
    hoveredElPosition.length < 1 &&
      (hoveredElPosition = [hoveredEl.offsetTop, hoveredEl.offsetLeft]);

    hoveredEl.style.cssText = `top: ${y}px; left: ${x}px`;

    if (
      hoveredEl.offsetTop <= hoveredElPosition[0] - 100 ||
      hoveredEl.offsetTop >= hoveredElPosition[0] + 100 ||
      hoveredEl.offsetLeft <= hoveredElPosition[1] - 100 ||
      hoveredEl.offsetLeft >= hoveredElPosition[1] + 100
    ) {
      hoveredEl.style.cssText = "";
      hoveredElPosition = [];
    }

    hoveredEl.onmouseleave = () => {
      hoveredEl.style.cssText = "";
      hoveredElPosition = [];
    };
  }
  // End of Sticky Element
};

//mous transform
const mouseCircleTransform=(hoveredEl)=>{
  if(hoveredEl.classList.contains("pointer-enter")){
    hoveredEl.onmousemove=()=>{
      mouseCircleBool=false;
      mCircle.style.cssText=`width: ${hoveredEl.getBoundingClientRect().width}px;
       height: ${hoveredEl.getBoundingClientRect().height}px;
       top: ${hoveredEl.getBoundingClientRect().top}px;
       left: ${hoveredEl.getBoundingClientRect().left}px;
       opacity:1;
       transform: translate(0, 0);
       animation: none;
       border-radius: ${getComputedStyle(hoveredEl).borderBottomLeftRadius};
       transition: width .5s, height .5s, top .5s, left .5s, transform .5s, border-radius .5s;
       `;
    };
    hoveredEl.onmouseleave=()=>{
      mouseCircleBool=true;
    };
    document.onscroll=()=>{
      if(!mouseCircleBool){
        mCircle.style.top=`${hoveredEl.getBoundingClientRect().top}px`;
      }
    }


  }
};



document.body.addEventListener('mousemove',(e)=>{
    let x=e.clientX;
    let y=e.clientY;

    mCircleFn(x,y);
    animateCircles(e,x,y);

    const hoveredEl=document.elementFromPoint(x,y);
    stickyElement(x,y,hoveredEl);
    mouseCircleTransform(hoveredEl);

   

});

document.body.addEventListener('mouseleave',()=>{
    mCircle.style.opacity='0';
    mDot.style.opacity='0';
});

const mainBtns=document.querySelectorAll('.mainbtn');
mainBtns.forEach(btn=>{
  let ripple;

btn.addEventListener('mouseenter', e=>{
  const left=e.clientX-e.target.getBoundingClientRect().left;
  const top=e.clientY-e.target.getBoundingClientRect().top;

  ripple = document.createElement('div');
  ripple.classList.add('ripple');
  ripple.style.left = `${left}px`;
  ripple.style.top = `${top}px`;
  btn.prepend(ripple);
});

btn.addEventListener('mouseleave',()=>{
  btn.removeChild(ripple);
});
});

// this for prog bar
const sections=document.querySelectorAll('section');
const progressBar=document.querySelector('.progress-bar');
const halfCircles=document.querySelectorAll('.half-circle');
const halfCircleTop=document.querySelector('.half-circle-top');
const progressBarCircle=document.querySelector('.progress-bar-circle');


let scrolledPortion=0;
let scrollBool=false;
let imageWrapper=false;


const progressBarFn=(bigImgWrapper)=>{
  imageWrapper=imageWrapper;
  let pageHeight=0;

  const pageViewportHeight=window.innerHeight;

if(!imageWrapper){
  pageHeight=document.documentElement.scrollHeight;
  scrolledPortion=window.pageYOffset;
} else {
  pageHeight=imageWrapper.firstElementChild.scrollHeight;
  scrolledPortion=imageWrapper.scrollTop;
}





  const scrolledPortionDegree=(scrolledPortion/(pageHeight-pageViewportHeight))*360;
  halfCircles.forEach(el=>{
    el.style.transform=`rotate(${scrolledPortionDegree}deg)`;

    if(scrolledPortionDegree>=180){
      halfCircles[0].style.transform="rotate(180deg)";
      halfCircleTop.style.opacity="0";
    } else {
      halfCircleTop.style.opacity="1";
    }
  });

    scrollBool=scrolledPortion+pageViewportHeight===pageHeight;



  if(scrollBool){
    progressBarCircle.style.transform="rotate(180deg)";
  } else{
    progressBarCircle.style.transform="rotate(0)";
  };


};
progressBar.addEventListener('click',e=>{
  e.preventDefault();

  if(!imageWrapper){
    const sectionPositions=Array.from(sections).map((section)=>scrolledPortion+section.getBoundingClientRect().top
    );
    const position=sectionPositions.find(sectionPosition=>{
      return sectionPosition>scrolledPortion;
    });



    scrollBool ? window.scrollTo(0,0) : window.scrollTo(0,position);
    console.log(position);
  } else{
    scrollBool ? imageWrapper.scrollTo(0,0) : imageWrapper.scrollTo(0,imageWrapper.scrollHeight);
  }




});
progressBarFn();

const menuIcon=document.querySelector('.menu-icon');
const navbar=document.querySelector('.navbar');

const scrollFn=()=>{
  menuIcon.classList.add('show-menu-icon');
  navbar.classList.add('hide-navbar');

  if(window.scrollY===0){
    menuIcon.classList.remove('show-menu-icon');
    navbar.classList.remove('hide-navbar');
  }

  progressBarFn();
}

document.addEventListener('scroll',scrollFn);

menuIcon.addEventListener('click', ()=>{
  menuIcon.classList.remove('show-menu-icon');
  navbar.classList.remove('hide-navbar');
})



const aboutMeText=document.querySelector('.aboutmetext');
const aboutMeTextContent="Hey there. I'm Adeeb, a web devloper, graphic designer, video editor, ethical hacker, AR Expert and a streamer. I love to explore new fields and constantly work to master whatever I do. I love to solve CTF challenges. I am also part of the student press team at Under 25 ";

Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement('span');
  span.textContent = char;
  aboutMeText.appendChild(span);

  span.addEventListener('mouseenter', (e) => {
    e.target.style.animation='aboutMeTextAnim 10s infinite';
  });
});

const container=document.querySelector('.container');
const projects=document.querySelectorAll('.project');
const projectHideBtn=document.querySelector('.project-hide-btn');


projects.forEach((project,i) => {
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight + 20
    }px`;
  });
  
  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top='2rem';
  });

  project.addEventListener('click',()=>{
    const bigImgWrapper = document.createElement('div');
    bigImgWrapper.className='project-img-wrapper';
    container.appendChild(bigImgWrapper);

    const bigImg = document.createElement("img");
    bigImg.className = "project-img";
    const imgPath = project.firstElementChild.getAttribute("src").split(".")[0];
    bigImg.setAttribute("src", `${imgPath}-big.png`);
    bigImgWrapper.appendChild(bigImg);
    document.body.style.overflowY = "hidden";//hide scrollbar

    document.removeEventListener('scroll',scrollFn);

    mCircle.style.opacity=0;

    progressBarFn(bigImgWrapper);
    bigImgWrapper.onscroll=()=>{
      progressBarFn(bigImgWrapper);
    }

    projectHideBtn.classList.add("change");

    projectHideBtn.onclick = () => {
      projectHideBtn.classList.remove("change");
      bigImgWrapper.remove();
      document.body.style.overflowY = "scroll";


      document.addEventListener("scroll", scrollFn);

      progressBarFn();
    };

  });

  i>=3&&(project.style.cssText="display:none;opacity:0"); 



});

const section3=document.querySelector('.section3');
const projectsBtn=document.querySelector('.projects-btn');
const projectsBtnText=document.querySelector('.projects-btn span');
let showHideBool=true

const showProjects=(project,i)=>{
  setTimeout(()=>{
    project.style.display="flex";
    section3.scrollIntoView({behavior: "smooth", block: "end"});
  },600);

  setTimeout(()=>{
    project.style.opacity="1";
  },i*200);
}

const hideProjects=(project,i)=>{
  setTimeout(()=>{
    project.style.display="none";
    section3.scrollIntoView({behavior: "smooth", block: "end"});
  },1200);
  setTimeout(()=>{
    project.style.opacity="0";
  },i*100);
}

projectsBtn.addEventListener('click',(e)=>{
  e.preventDefault();

  projectsBtn.firstElementChild.nextElementSibling.classList.toggle("change");

  showHideBool
    ? (projectsBtnText.textContent = "Show Less")
    : (projectsBtnText.textContent = "Show More");

  projects.forEach((project, i) => {
    i >= 3 &&
      (showHideBool ? showProjects(project, i) : hideProjects(project, i));
  });
  showHideBool = !showHideBool;
});

//section4 under 
document.querySelectorAll(".service-btn").forEach((service) => {
  service.addEventListener("click", (e) => {
    e.preventDefault();

    const serviceText = service.nextElementSibling;
    serviceText.classList.toggle("change");

    const rightPosition = serviceText.classList.contains("change")
      ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})`
      : 0;

    service.firstElementChild.style.right = rightPosition;
  });
});


//section5

const formHeading = document.querySelector(".form-heading");
const formInputs = document.querySelectorAll(".contact-form-input");

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = `Your ${input.placeholder}`;
      formHeading.style.opacity = "1";
    }, 300);
  });

  input.addEventListener("blur", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = "Let's Talk";
      formHeading.style.opacity = "1";
    }, 300);
  });
});

const slideshow = document.querySelector(".slideshow");

setInterval(() => {
  const firstIcon = slideshow.firstElementChild;

  firstIcon.classList.add("faded-out");

  const thirdIcon = slideshow.children[3];

  thirdIcon.classList.add("light");

  thirdIcon.previousElementSibling.classList.remove("light");

  setTimeout(() => {
    slideshow.removeChild(firstIcon);

    slideshow.appendChild(firstIcon);

    setTimeout(() => {
      firstIcon.classList.remove("faded-out");
    }, 500);
  }, 500);
}, 3000);

const form = document.querySelector(".contact-form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const messages = document.querySelectorAll(".message");

const error = (input, message) => {
  input.nextElementSibling.classList.add("error");
  input.nextElementSibling.textContent = message;
};

const success = (input) => {
  input.nextElementSibling.classList.remove("error");
};

const checkRequiredFields = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      error(input, `${input.id} is required`);
    }
  });
};

const checkLength = (input, min) => {
  if (input.value.trim().length < min) {
    error(input, `${input.id} must be at least ${min} characters`);
  } else {
    success(input);
  }
};

const checkEmail = (input) => {
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regEx.test(input.value.trim())) {
    success(input);
  } else {
    error(input, "Email is not valid");
  }
};

form.addEventListener("submit", (e) => {
  checkLength(username, 2);
  checkLength(subject, 2);
  checkLength(message, 10);
  checkEmail(email);
  checkRequiredFields([username, email, subject, message]);

  const notValid = Array.from(messages).find((message) => {
    return message.classList.contains("error");
  });

  notValid && e.preventDefault();
});