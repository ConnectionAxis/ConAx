import scroll from 'scroll';
import getDocument from 'scroll-doc';
import { addListener } from './utils/events';

document.addEventListener("DOMContentLoaded", function(e){
	wReady();
});

function wReady(e) {
	addListener(
		document.querySelector('.slide-index-nav'), 'click', 'a[href^="#slide-"]',
	    e => (e.preventDefault(), onSlideNav(e))
	);
	addListener(
		document.querySelector('#conax-sign'), 'click', '#conax-sign-submit',
	    e => (e.stopPropagation(), onSignSubmit(e))
	);
	addListener(
		document.querySelector('#conax-sign'), 'keyup', '.conax-sign-input',
	    e => (e.preventDefault(), onSignInputChange(e))
	);
  document.getElementById('scroll-to-top').addEventListener('click', onScrollToTop);
	document.addEventListener('scroll', onScroll);

	const mhandlers = Array.from(document.getElementsByClassName('c-js-modal'));
	for ( let i in mhandlers ) {
		mhandlers[i].addEventListener('click', (e) => { onModalOpen(mhandlers[i], e) });
	}

  document.getElementById('modal-close').addEventListener('click', onModalClose);

  document.getElementById('conax-modal').addEventListener('click', (e) => {
  	if( e.target !== modal && e.target !== modalDialog ) return;
  	onModalClose();
  });

  // Remove webhost ads element
	try {
		document.querySelector('[alt="www.000webhost.com"]').parentNode.parentNode.remove();
	} catch(e) {}
}

const doc = getDocument();
const slides = Array.from(document.querySelectorAll('.slide'));
const modal = document.getElementById('conax-modal');
const modalDialog = modal.querySelector('.modal-dialog');
const dBody = document.getElementsByTagName('body')[0];

function onSlideNav(e) {
  const slide = document.querySelector(e.target.hash);
  const index = slides.indexOf(slide);
  scrollTo(slide, index+1, { duration: index * 400 });
}

function scrollTo(node, index, ...args) {
  const top = document.body.getBoundingClientRect().top;
  scroll.top(doc, node.getBoundingClientRect().top + Math.abs(top), ...args);
}

function onScroll(e) {
	const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
	const slideHeight = (slides.length > 0) ? slides[0].offsetHeight : document.documentElement.clientHeight;
	const toTop = document.getElementById("scroll-to-top");
  const social = document.getElementById("social-float");
	const nav = document.getElementById("nav-panel-float");

	if( toTop ) {
		if( top > slideHeight-2 ) {
			toTop.classList.remove("hide");
		} else {
			toTop.classList.add("hide");
		}
	}

  if( social ) {
    if( top > slideHeight-2 ) {
      social.classList.remove("hide");
    } else {
      social.classList.add("hide");
    }
  }

	if( nav ) {
		if( top > slideHeight-2 ) {
			nav.classList.remove("hide");
		} else {
			nav.classList.add("hide");
		}
	}
}

function onModalOpen(c, e) {
	e.preventDefault();

	modal.classList.add('show');
	dBody.classList.add('modal-open');

	document.getElementById(c.dataset.modalContent).classList.remove('hide');
}

function onModalClose() {
	const mcontent = Array.from(document.getElementsByClassName('conax-modal'));
	for ( let i in mcontent ) {
		mcontent[i].classList.add('hide');
	}

	modal.classList.remove('show');
	dBody.classList.remove('modal-open');
}

function onScrollToTop(e) {
	scroll.top(doc, 0, { duration: 500 });
}

function onSignSubmit(e) {
	const inputs = document.getElementsByClassName("conax-sign-input");
	const submit = document.getElementById("conax-sign-submit");

	if( submit.classList.contains("ready") )
		return;

	var data = {};
	var valid = true;

	for (var i = 0; i < inputs.length; i++) {
		if( inputs[i].value.length == 0 ) {
			onSignInputChange({ target: inputs[i] });
			valid = false;
		} else {
			switch( inputs[i].name ) {
				case "email":
					if( ValidateEmail(inputs[i].value) ) {
						data[inputs[i].name] = inputs[i].value;
					} else {
						document.getElementById("sign-alert").classList.remove("hide");
						valid = false;
					}
					break;
				default:
					data[inputs[i].name] = inputs[i].value;
					break;
			}
		}
	}

	if( valid ) {
		document.getElementById("sign-alert").classList.add("hide");
		submit.classList.add("ready");
		submit.innerText = "Thank you for request!";
		console.info("[ConAx] Sign Up: email: %s, name: %s", data["email"], data["name"]);
	}
}

function onSignInputChange(e) {
	const trg = e.target;
	const label = trg.previousSibling;

	if( trg.value.length == 0 ) {
		label.classList.remove("hide");
	} else {
		label.classList.add("hide");
	}
}

function ValidateEmail(value) {
	return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
}