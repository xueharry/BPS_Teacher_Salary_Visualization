# BPS_Teacher_Salary_Visualization

A map-based visualization of average high school teacher salary across the Boston Public Schools in 2014 using publicly available data.
View at http://xueharry.github.io/BPS_Teacher_Salary_Visualization/.

![Imgur](http://i.imgur.com/Ik8n8sM.png)

# Usage
Click on the circle marker for any particular school to open up a side panel with a more detailed breakdown, including a histogram, boxplot and a table of teacher salaries listed by name. Search for a particular high school by clicking on the search icon in the top right corner and enter in the name of the school of interest. Click on a school in the results list to open up its breakdown.

# Data
All data was gathered from publicly available sources. Teacher salary data was retreived from https://data.cityofboston.gov/Finance/Employee-Earnings-Report-2014/4swk-wcg8 and school geodata was gathered from http://bostonopendata.boston.opendata.arcgis.com/datasets/1d9509a8b2fd485d9ad471ba2fdb1f90_0?uiTab=table.

You can read about my data preprocessing methodology (as well as download both the raw and cleaned datasets) [here] (https://github.com/xueharry/BPS_Teacher_Salary_Data).

A few caveats:
* I defined a teacher to be an employee of Boston listed with the title "Teacher" in the dataset. This means that substitutes, paraprofessionals, custodians, cafeteria staff, principals, administrators etc. are not included in my analysis.
* I defined high school to refer to all the non-alternative and non-special education schools (to the best of my knowledge) that serve grades 9-12 within the Boston Public Schools. Two schools (Dearborn and Henderson) were not included because the raw data does not distinguish which teachers at these schools teach at the high school level. However, the 3 exam schools (BLS, BLA and O'Bryant) were included despite the fact that they also serve grades 7 and 8 since they are reputed to be the highest performing in the district and hence would be interesting data points.
* The original raw dataset itself is not exhaustive. A glaring example of this is Madison Park High, which only had 2 employees with the tile "Teacher" in the dataset; however, a quick search on their school website reveals that there are far more.

Please feel free to reach out to me at wxue@college.harvard.edu if there is something that I missed or just got completely wrong (or if you find any bugs!).


