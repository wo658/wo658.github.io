---
title: "C++ 우선순위 큐"
categories:
   
tags:
  - C++
last_modified_at: 2023-10-12T00:25:52-01:00
---

## 우선순위 큐 정의 

priority_queue <T,vector<T>,compare> pq;
T < -- 구조체 , or int etc...
vector<T> 는 우선순위큐를 벡터로 구현하겠다는 의미.
Compare는 우선순위를 어떤식으로 지정해줄 것인지 정해준다.

Compare는 구조체로 bool 반환식 operator()(T a,T b)

T형인자를 받아서 비교자를 반환한다.

true를 리턴해서 비교연산자를 정의해준다.

