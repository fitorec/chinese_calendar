/*
 * chineseCalendar.js
 *
 * Author: fitorec
 * 
 * Copyright 2012, Fitorec
 * licensed under the MIT.
 *
 */

/* Contructor del objeto calendario chino
 * 
 * @param string year beetwen(1900-2029)
 * @param string month beetwen(1-12)
 * @param string day beetwen(1-31)
 * @param string sex man or woman
 */
ChineseCalendar = function( year, month, day){
	year = Number(year);
	/* Normalizacion del año: reducimos en uno el año en caso que la fecha de inicio(de entrada)
	 * es inferior al inicio del año chino*/
	init_year = this.chinese_init_year(year);
	if( Number((month-1)*31 + day) < Number((init_year.month-1)*31 + init_year.day) )
		year--;
	this.year = year;
	this.month = month;
	this.day = day;
}
 /*
  * Devuelve el el inicio del año chino que se recibe
  * 
  * @param Number number
  * @return the KUA number
  **/
ChineseCalendar.prototype.chinese_init_year = function(year){
	chinese_years_init = new Array(
		"1.31","2.19","2.08","1.29","2.16","2.04","1.25","2.13","2.02","1.22", //1900-1909
		"2.10","1.30","2.18","2.06","1.26","2.14","2.03","1.23","2.11","2.01", //1910-1919
		"2.20","2.08","1.28","2.16","2.05","1.25","2.13","2.02","1.23","2.10", //1920-1929
		"1.30","2.17","2.06","1.26","2.14","2.04","1.24","2.11","1.31","2.19", //1930-1939
		"2.08","1.27","2.15","2.05","1.25","2.13","2.02","1.22","2.10","1.29", //1940-1949
		"2.17","2.06","1.27","2.14","2.03","1.24","2.12","1.31","2.18","2.08", //1950-1959
		"1.28","2.15","2.05","1.25","2.13","2.02","1.21","2.09","1.30","2.17", //1960-1969
		"2.06","1.27","2.15","2.03","1.23","2.11","1.31","2.18","2.07","1.28", //1970-1979
		"2.16","2.05","1.25","2.13","2.02","2.20","2.09","1.29","2.17","2.06", //1980-1989
		"1.27","2.15","2.04","1.23","2.10","1.31","2.19","2.07","1.28","2.16", //1990-1999
		"2.05","1.24","2.12","2.01","1.22","2.09","1.29","2.18","2.07","1.26", //2000-2009
		"2.14","2.03","1.23","2.10","1.31","2.19","2.08","1.28","2.16","2.05", //2010-2019
		"1.25","2.12","2.01","1.22","2.10","1.29","2.17","2.06","1.26","2.13"  //2020-2029
	);
	var index = Number(year - 1900);
	var year_ini = chinese_years_init[index].split('.');
	return { 'month' : year_ini[0], 'day': year_ini[1]};
}
 /*
  * Calcula el número KUA apartir de la fecha de nacimiento y el sexo
  * 
  * @return the KUA number
  **/
 
ChineseCalendar.prototype._generate_kua =  function(sex){
	this.kua_number = this.reduce_number(this.year);
	//incrementos/decrementos por defecto en funcion del año //
	var inc_woman = (this.year<2000)? 5 : 6;
	var inc_man = (this.year<2000)? 10 : 9;
	
	if(sex == 'woman'){
		//Al resultado se inc 5(year<2000) ó 6
		this.kua_number = inc_woman + this.kua_number;
		this.kua_number = this.reduce_number(this.kua_number);
		//tu número Kua es el 5, deberás usar el 8.
		if( this.kua_number == 5 )
			this.kua_number = 8;
	}else{
		//Al resultado se inc 5(year<2000) ó 6
		this.kua_number = inc_man - this.kua_number ;
		//tu número Kua es el 5, deberás usar el 2. 
		if( this.kua_number == 5 )
			this.kua_number = 2;
	}
	return this.kua_number;
}
 /*
  * Regresa el valor kua calculado
  * 
  * @return the KUA number
  **/
ChineseCalendar.prototype.kua =  function(sex){
	//Reducimos el numero a 2 digitos
	if(!this.kua_number)
		this._generate_kua(sex);
	return this.kua_number;
}

 /*
  * Reduce un numero de n digitos a uno, sumando los 2 ultimos asta que se cumpla
  * 
  * @param Number number
  * @return Number number 
  **/
ChineseCalendar.prototype.reduce_number = function (number){
	str_num = new String(number);
	if(str_num.length>1)
		return this.reduce_number( Number( str_num.charAt(str_num.length-1) ) +  Number(str_num.charAt(str_num.length-2)) );
	return Number(number);
}
/*
 *	http://en.wikipedia.org/wiki/Chinese_zodiac
 */
ChineseCalendar.prototype.zodiac_sign = function (){
	return Array(
		"Monkey",
		"Rooster",
		"Dog",
		"Pig",
		"Rat",
		"Ox",
		"Tiger",
		"Rabbit",
		"Dragon",
		"Snake",
		"Horse",
		"Sheep"
	)[Number(this.year%12)];
}

/*
 *	http://en.wikipedia.org/wiki/Chinese_zodiac
 */
ChineseCalendar.prototype.element = function (){
	switch (this.kua_number)
	{
		case 1: return 'Agua';
		case 2: return "Tierra";
		case 3: return "Madera";
		case 4: return "Madera";
		case 5: return "Tierra";
		case 6: return "Metal";
		case 7: return "Metal";
		case 8: return "Tierra";
		case 9: return "Tierra";
		default: return null;
	}
}
