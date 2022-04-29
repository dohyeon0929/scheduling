module.exports = {

    month_process : function(year, now){ //인수로 밑에 두 개 입력 받기
        var year; //사용자한테 입력받을 예정
        var now; //사용자한테 입력받을 예정
        var years = {};
        years[2022] = 2;
        var i=1;
        while(i<2023){
            var temp_year = 2022+i;
            var temp_year_before = 2022 - i;
            years[temp_year] = years[temp_year -1]+1;
            years[temp_year_before] = years[temp_year_before+1] - 1;
            if(temp_year%4==0){
                years[temp_year]+=1;
            }
            years[temp_year]%=7;
            if(temp_year_before%4==0){
                years[temp_year_before]-=1;
            }
            if(years[temp_year_before]<0){
                years[temp_year_before]+=7;
            }
            i+=1;
        }
        
        
            
        var month_data = new Array(2);
        month_data[0] = new Array(13);
        i=0;
        while(i<13){
            month_data[0][i] = ' ';
            i+=1;
        }
        month_data[1] = [0,31,28,31,30,31,30,31,31,30,31,30,31];
        if(year%4==0){
            month_data[1][2]=29;
        }
        if(year%100==0){
            month_data[1][2]=28;
        }
        if(year%400==0){
            month_data[1][2]=29;
        }

        month_data[0][3] = years[year];
        i=4;
        while(i<13){
            month_data[0][i] = (month_data[0][i-1] + month_data[1][i-1])%7;
            i+=1;
        }
        month_data[0][2] = month_data[0][3]-(28 - month_data[1][2]);
        if(month_data[0][2] == -1){
            month_data[0][2] = 6;
        }
        
        month_data[0][1] = month_data[0][2] -3;
        if(month_data[0][1]<0){
            month_data[0][1] +=7;
        }
    
        
        var dateArray = [];
        var month_now = [];
        i=0;
        while(i<month_data[0][now]){
            dateArray.push(' ');
            i +=1;
        }
        i=1;
        while(i<month_data[1][now]+1){
            dateArray.push(i);
            i+=1;
        }

        i=0;
        var temp = dateArray.length%7;
        while(i< 7-temp){
            dateArray.push(' ');
            i+=1;
        }
        if(year==1){
            dateArray=[];
        }
        if(year==1 && now==12){
            dateArray=[' ',25,26,27,28,29,30,31,' ',' ',' ',' ',' ',' '];
        }
        
        i=0;
        var rows = dateArray.length/7;
        while(i<rows){
            month_now.push(dateArray.slice(0,7));
            var j=0;
            while(j<7){
                dateArray.shift();
                j+=1;
            }
            i+=1;
        }
        return month_now;
    },
    dates : function(year, month){
        var month_now = this.month_process(year,month);
        var rows = (month_now.length);
        var i=0;
        var j=0;
        console.log("I'm working");
        var date = `       
        <table border="1" bordercolor="blue" width="500" height = "300">
        <tr id="yearBlock">
        <p><td colspan = "7"  style="color:black" align="center">${year}년</td></p>
        </tr>
        <tr id="monthBlock">
            <p><td colspan = "7" bgcolor = "blue" style="color:white" align="center">${month}월</td></p>
        </tr>
        <tr align = "center" bgcolor="skybule">
            <td>일</td>
            <td>월</td>
            <td>화</td>
            <td>수</td>
            <td>목</td> 
            <td>금</td>
            <td>토</td>
        </tr>
      `;
        while(i<rows){
            j=0;
            date += `<tr align="center">`
            while(j<7){
                if(month_now[i][j]!=' '){
                    date+=`<td class="day" id ="day${String(month_now[i][j])}">${String(month_now[i][j])}`;
                }
                else{
                    date+=`<td class="blank">`;
                }
                date+=`</td>`;
                j+=1;
            }
            date+=`</tr>`;
            i+=1;
        }
        date+=`</table>`;
        date+=`<input type="button" onclick="sendDataArray()">`
        return date;
    },
    button: `
    
    <h3 class="select_date_button">select date</h3>
    <form class="select_date_button" action="/calander">
        <input type="text" placeholder="year" name="year"> 
        <input type="text" placeholder="month" name="month"> 
        <input type="submit">
    </form>`,
    templateHtml : function(date){
        var button = this.button;
        return `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <script src="http://code.jquery.com/jquery-latest.js"></script>
        <title>calander</title>
        <link rel="stylesheet" href="style.css">
        <style>
            .selected{
                color:white;
                background-color:blue;
            }
        </style>
        </head>
        <body>
        <h3>달력 자동 생성 프로그램 by 김도현</h3>
        ${date}
        ${button}
        
        <script>
        
            var dataArray= new Array(33);
            dataArray.fill(0);
            $(document).ready(function () {
                $("td.day").on("click", function () {
                    $(this).toggleClass("selected");
                    // $(".select_data_button).remove();
                    var numId = parseInt(this.id.slice(3));
                    if(dataArray[numId]==1) {
                        dataArray[numId]=0;
                    }
                    else{
                        dataArray[numId]=1;
                    }
                    var i=0;
                    while(i<33){
                        console.log(dataArray[i]);
                        i+=1;
                    }
                });
            });

            sendDataArray(this){
                var i=0;
                
                while(i<33){
                    if(i==1){

                    }
                    i+=1;
                }
                dataArray
            }
        </script>
        </body>
        </html>`
    }
}   
