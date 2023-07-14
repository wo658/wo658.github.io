---
title: "자바 입출력"
categories:
   
tags:
  - Java
last_modified_at: 2023-07-13T00:25:52-01:00
---

## Scanner vs BufferedReader

BufferedReader는 스캐너와 달리 엔터를 기준으로 String 값으로 받아온다. 또한 버퍼드리더는 버퍼에 문자를 모았다가 한번에 전송하기 때문에 Scanner보다 속도가 빠르다. 

데이터가 큰 경우에는 BufferdReader 사용이 권장됨.

## BufferdReader 사용법

StringTokenizer를 통해 BufferdReader로 받아 온 문자열을 슬라이싱 해서 관리한다. StringTokenizer는 (문자열 ,구분기호, 적용방법) 등을 명시할 수 있으며 default의 경우 구분기호를 공백으로 구분한다.

