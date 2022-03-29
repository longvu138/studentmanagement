
function InputSearch()
{
    let input,filter,table,tr,td,found;
    input   = document.getElementById("search");
    filter  = input.value.toUpperCase();
    table   = document.getElementById("myTable");
    tr      = table.getElementsByTagName("tr");
    for(let i=0; i < tr.length; i++)
    {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++)
        {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) 
            {
                found = true;
            }
        }
        if(found)
        {
            tr[i].style.display="";
            found = false;
        }
        else
        {
            tr[i].style.display="none";
        }
    }
}