---
title: "SQL 기초"
categories:
  - Database
tags:
   
last_modified_at: 2017-03-09T14:25:52-05:00
---

SQL 기초적인 활용법 정리

## 목차 
## 1. SQL 개념 2. DDL 3. DCL 4. DML 5. SELECT 

## SQL 개념

SQL이란 국제 표준 데이터 베이스 언어이며.
관계대수와 관계해석을 기초로 한 혼합 데이터 언어이다.
분류기준으로는 DDL,DML,DCL 각각 정의 , 조작 , 제어로 나뉜다.
Data ____ Language 기본 틀 안에 Define , Manipulation , Control 이 들어간다.

## DDL 

Data Define Language , 데이터 정의어
데이터의 정의를 목적으로 하는 언어.
CREATE, ALTER, DROP 등이 있다.
CREATE - SCHEMA, DOMAIN, TABLE, VIEW, INDEX 등을 정의한다.
ALTER - TABLE 정의를 변경.
DROP - SCHEMA, DOMAIN, TABLE, VIEW, INDEX 등을 삭제한다.

활용 예시 //  

CREATE TABLE TABLE_NAME 
(   속성명 데이터_타입,
    PRIMARY...(etc) KEY(attribute_name),
    ...
    );

ALTER TABLE TABLE_NAME ADD attribute_name data_type [DEFAULT '기본값'];
ADD외에 ALTER ,DROP COLUMN 등이 있으며 각 메소드마다 문법이 다르다.

DROP TABLE TABLE_NAME CASECADE;
CASECADE => 참조 무결성 제약 조건 설정을 위해 제거할 요소를 참조하는 다른 모든 개체를 함께 제거. 즉 외래키를 참조하는타 테이블까지 전체 삭제.
RESTRICT => 다른 개체가 제거할 요소를 참조중일 때는 제거를 취소한다.

## DCL

Data Control Language , 데이터 제어어
데이터 무결성,보안등을 목적으로 하는 언어.
GRANT, REVOKE, COMMIT, ROLLBACK, SAVEPOINT 등이 있다.
GRANT - 문자 그대로 부여하는 기능을 한다. 무엇을? 권한을.
REVOKE - 권한을 회수하는 역할
COMMIT - 트랜잭션이 성공적으로 끝날 시 데이터베이스에 변경사항을 반영하는 역할.
ROLLBACK - 트랜잭션이 성공적으로 끝나지 않을 시 COMMIT 되기 전 변경사항들을 전부 되돌리는 역할.
SAVEPOINT - ROLLBACK할 위치를 정확히 지정해주는 역할.

활용 예시 //
GRANT 등급 TO 사용자 ;
REVOKE 등급 FROM 사용자; 
( GRANT,REVOKE 는 영어를 생각하면 쉽다. 사용자 에게,사용자로 부터)

COMMIT
SAVEPOINT
COMMIT 은 그대로 사용 SAVEPOINT 는 세이브 변수를 설정해 현재 상태를 저장한다.
ROLLBACK 은 TO (SAVEPOINT 지정 변수) 로 사용하면 세이브포인트 지점으로,
그냥 사용 시 마지막 COMMIT 지점으로 이동한다.

## DML

Data Manipulation Language , 데이터 조작어
저장된 데이터베이스를 관리하는데 사용되는 언어. 가장 많이 사용된다.
SELECT, INSERT, DELETE, UPDATE 등이 있다.

기본적으로 tuple을 접근한다.
INSERT - 테이블에 새로운 tuple 을 삽입.
DELETE - 테이블에 있는 tuple을 제거.
UPDATE - 테이블에 있는 tuple중 특정 tuple의 내용을 변경할 때 사용.


활용 예시 //
INSERT INTO TABLE_NAME VALUES (attribute1_content, ...);
-> 전체 attribute가 아닌 특정 attribute만 삽입. 시 테이블 뒤에 속성명을 추가
DELETE FROM TABLE_NAME WHERE 조건;
-> 삭제 조건을 설정해야 함 
UPDATE TABLE_NAME SET 변경사항 WHERE 조건;
-> 변경사항은 ATTRIBUTE_NAME ='DATA' 등으로 사용

## SELECT

SELECT - 가장 많이 쓰이는 SQL문 . TABLE에 tuple 검색 시 사용된다.

1 . 가장 일반적인 사용 법 SELECT * FROM TABLE_NAME;
-> * 모든 속성을 지정한다
즉 해당 TABLE의 전체 속성을 불러옴으로 전체 TABLE을 불러오게 된다.
SELECT의 경우 속성을 지정할 경우 해당 속성의 전체 tuple data를 가져 오기 때문에 열을 parsing 한다고 볼 수 있다.

2 . 조건 지정 검색

SELECT * FROM TABLE_NAME WHERE 조건;
기본적인 사용법에 WHERE 조건을 붙인 경우, 조건에 맞는 튜플을 검색한다. *을 지정했기 때문에 행을 검색하는 사용방법. 조건에 맞는 tuple 전체를 찾아온다.

3 . 정렬 검색 

기본적인 사용법에 ORDER BY ATTRIBUTE_NAME DESE,ASC;
영어식 표현으로 DESC는 내림차순 ASC는 오름차순 정렬이 된다.
기준 속성명을 다중 입력시 먼저 입력한 순서로 우선순위를 갖는다.
즉 , 중복속성명이 존재하는 경우의 이중 정렬에 사용된다.

4 . 하위 질의

예제로 확인하는 것이 좋다.
SELECT 이름,주소 FROM 사원 WHERE 이름 = (SELECT 이름 FROM 여가활동 WHERE 취미 ='댄스');
2중으로 구성되어 있고 여가활동 TABLE에서 처음 검색조건을 설정한 후 그 조건을 기준으로 사원 테이블에서 검색을 하는 상황으로 TABLE,TABLE을 연결해서 검색을 해야하는 경우 사용한다.

5 . 복수 테이블 검색

FROM 뒤에 TABLE을 두개 이상으로 지정하면 된다. 각 변수에 접근할 시 구조체,클래스 접근 시 처럼 TABLE_NAME.ATTRIBUTE_NAME 식으로 사용한다.

## SELECT 함수 , 집합 연산자 , JOIN

크게 GROUP BY, WINDOW 로 나뉜다.
GROUP BY 는 특정 속성의 그룹들을 특정 방식으로 집계하는 방식이다.
WINDOW 함수의 인수로 지정한 속성을 범위로 하여 속성의 값을 집계한다.
JOIN 연관된 튜플들을 결합하여 하나의 새로운 릴레이션을 반환한다.
각각의 자세한 사용법은 후에 추가로 tech2에 기술하겠다.

## 마무리
SQL문은 크게 DDL,DML,DCL 로 나뉘며 각각의 개념과 문법을 정확히 숙지하자. 또한 각각의 문법 중 가장 자주 쓰이는 SELECT 문의 경우 다양한 활용방식에 대해서도 익히고 있는 것이 좋겠다.
