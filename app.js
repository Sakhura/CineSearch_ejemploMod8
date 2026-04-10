//1.- URL API
const API_BASE='https://api.tvmaze.com'

//2.-Seleccionar los elementos del HTML
const searchInput = document.getElementById('searchInput');
const searchBtn   = document.getElementById('searchBtn');
const heroState   = document.getElementById('heroState');
const loader      = document.getElementById('loader');
const errorMsg    = document.getElementById('errorMsg');
const results     = document.getElementById('results');