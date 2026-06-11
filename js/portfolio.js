(function () {
	'use strict';

	var activeCategory = 'all';
	var activeYear = 'all';
	var activeSort = 'newest';
	var portfolioGrid = document.getElementById('portfolio-grid');
	var portfolioItems = document.querySelectorAll('.portfolio-item');
	var categoryBtns = document.querySelectorAll('.filter-category');
	var yearBtns = document.querySelectorAll('.filter-year');
	var sortBtns = document.querySelectorAll('.filter-sort');

	function sortPortfolio(order) {
		if (!portfolioGrid) return;

		var items = Array.prototype.slice.call(portfolioGrid.querySelectorAll('.portfolio-item'));

		items.sort(function (a, b) {
			var yearA = parseInt(a.getAttribute('data-year'), 10);
			var yearB = parseInt(b.getAttribute('data-year'), 10);

			if (order === 'oldest') {
				return yearA - yearB;
			}

			return yearB - yearA;
		});

		items.forEach(function (item) {
			portfolioGrid.appendChild(item);
		});
	}

	function applyFilters() {
		portfolioItems.forEach(function (item) {
			var category = item.getAttribute('data-category');
			var year = item.getAttribute('data-year');
			var catMatch = activeCategory === 'all' || category === activeCategory;
			var yearMatch = activeYear === 'all' || year === activeYear;

			if (catMatch && yearMatch) {
				item.classList.remove('hidden');
			} else {
				item.classList.add('hidden');
			}
		});
	}

	categoryBtns.forEach(function (btn) {
		btn.addEventListener('click', function () {
			activeCategory = btn.getAttribute('data-filter');

			categoryBtns.forEach(function (b) {
				b.classList.remove('active');
			});
			btn.classList.add('active');

			applyFilters();
		});
	});

	yearBtns.forEach(function (btn) {
		btn.addEventListener('click', function () {
			activeYear = btn.getAttribute('data-year');

			yearBtns.forEach(function (b) {
				b.classList.remove('active');
			});
			btn.classList.add('active');

			applyFilters();
		});
	});

	sortBtns.forEach(function (btn) {
		btn.addEventListener('click', function () {
			activeSort = btn.getAttribute('data-sort');

			sortBtns.forEach(function (b) {
				b.classList.remove('active');
			});
			btn.classList.add('active');

			sortPortfolio(activeSort);
		});
	});

	sortPortfolio(activeSort);
	applyFilters();

	// Slideshow
	var slideIndex = 1;
	var slideTimer;

	function showSlide(n) {
		var slides = document.getElementsByClassName('mySlides');
		var dots = document.querySelectorAll('.slide-dots .dot');

		if (!slides.length) return;

		if (n > slides.length) slideIndex = 1;
		if (n < 1) slideIndex = slides.length;

		for (var i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
		}

		for (var j = 0; j < dots.length; j++) {
			dots[j].classList.remove('active');
		}

		slides[slideIndex - 1].style.display = 'block';
		if (dots[slideIndex - 1]) {
			dots[slideIndex - 1].classList.add('active');
		}
	}

	function advanceSlide() {
		slideIndex++;
		showSlide(slideIndex);
	}

	function resetTimer() {
		clearInterval(slideTimer);
		slideTimer = setInterval(advanceSlide, 5000);
	}

	window.changeSlide = function (n) {
		slideIndex += n;
		showSlide(slideIndex);
		resetTimer();
	};

	window.goToSlide = function (n) {
		slideIndex = n;
		showSlide(slideIndex);
		resetTimer();
	};

	showSlide(slideIndex);
	resetTimer();

	// Navbar shrink on scroll
	var nav = document.getElementById('main-nav');
	if (nav) {
		window.addEventListener('scroll', function () {
			if (window.scrollY > 60) {
				nav.classList.add('navbar-shrink');
			} else {
				nav.classList.remove('navbar-shrink');
			}
		});
	}
})();
