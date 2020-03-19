var express = require("express");
var mysql = require("mysql");
var inquirer = require("inquirer")


var PORT = process.env.PORT || 8080;
var app = express();
