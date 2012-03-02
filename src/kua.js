/*
 * 
 * @link-idea: www.cintamani.com.ar/users/luzdevida/varios/fengshui3.htm 
 * @link-idea: http://www.espaciotiempo.com/cursos/fengshui/kua.jsp
 * @http://elfengshui.blogspot.com/2010/02/como-hallar-el-numero-kua.html
 **/

/* Este arreglo contiene las fechas de inicio del año chino, en formato mes.día
 * la posicion 0 refiere al año 1900
 * 
 * */
var chinese_year_init = new Array(
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
 /*
  * 
  * @param sex man or woman
  **/
function kua(year, month, day, sex){
	year = Number(year);
	/* Normalizacion del año,restamos un año en caso que el año chino todavia no habia empezado segun la fecha de inicio*/
	init_year = chinese_year_init[year-1900].split('.');
	//forma de hacerlo 1
	if( ((month-1)*31 + day) < ((init_year[1]-1)*31 + init_year[0]) )
		year--;
	/*
	//////////opcion 2
	var gregorian_date = new Date(year, month, day);
	var chinese_date = new Date(year, init_year[0], init_year[1]);
	if(gregorian_date<chinese_date)
		year--;
	//////////opcion 3
	if( month < parseInt(init_year[0])  ||
		(month==parseInt(init_year[0]) && day>parseInt(init_year[1]) ) ){
		year--;
	}
	*/
	
	/*
	*/
	var result = reduce_number(year);
	//incrementos/decrementos por defecto en funcion del año //
	var inc_man = (year<2000)? 10 : 9;
	var inc_woman = (year<2000)? 5 : 6;
	if(sex == 'woman'){
		//Al resultado se inc 5(year<2000) ó 6
		result = inc_woman + result;
		result = reduce_number(result);
		//tu número Kua es el 5, deberás usar el 8.
		if( result == 5 )
			result = 8;
	}else{
		//Si tu número Kua es el 5, deberás usar el 2. 
		result = inc_man - result ;
		//tu número Kua es el 5, deberás usar el 8.
		//deberás usar el 2. 
		if( result == 5 )
			result = 2;
	}
		return result;
}

function reduce_number(number){
	str_num = new String(number);
	if(str_num.length>1)
		return reduce_number( Number( str_num.charAt(str_num.length-1) ) +  Number(str_num.charAt(str_num.length-2)) );
	return parseInt(number);
}
