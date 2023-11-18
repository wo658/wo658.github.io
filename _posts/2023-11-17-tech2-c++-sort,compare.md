---
title: "C++ Sort() 및 compare"
categories:
   
tags:
  - C++
last_modified_at: 2023-10-12T00:25:52-01:00
---



## Sort

Sort(v.begin(),v.end());

기본적으로 내림차순으로 정렬

greater<int>() 를 뒤에 붙인다면 내림차순으로 정렬

greater를 큰 수를 앞에 둔다 로 기억하자.

주의할 점)
sort 의 end() 를 begin + i 로 표시할 때는 배열의 끝번호를 가르켜야 한다 begin보다 +1


## compare

sort함수에 compare를 붙여주면 사용자가 우선순위를 지정해주는 것이 가능하다.

예시 코드
'''cpp
vector <int> v(10,10);
 
bool compare(int i, int j) { return i > j; }
 
sort(v.begin(),v.end(),compare); // 2
'''

 즉 prev 가 next 보다 작아지게 정렬을 수행한다.
 만약 true면 정렬 x false면 정렬을 수행해서 모든 구간에 대하여 true를 만족하게 수행

추가로 compare 함수에는 <=,=> 사용 불가능 조건이 동일할 때 지정은 조건을 따로 추가해줘야한다