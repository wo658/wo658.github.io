---
title: "깃허브 블로그 기초"
categories:
  
tags:
  - git 
last_modified_at: 2017-03-09T14:25:52-05:00
---

깃허브 블로그 제작 방법과 오류 해결

## 깃허브 블로그 제작 과정

1. ruby 설치 
2. jekyll 테마 고른 뒤 저장소 fork 하기
3. fork 한 저장소에 bundle 설치
4. 터미널에서 $bundle exec jekyll serve (--trace) 로컬에서 사용 가능 로컬서버 주소는 http://127.0.0.1:4000/ 
5. git 저장소 이름 변경 후 brach save 하면 일반적으로 username.github.io domain 에 깃허브 블로그 배포 가능   

## 관련 오류와 해결 방법

1. ruby의 버전을 2.xx 로 맞추는 것이 버그가 덜 나온다고 한다 (stackoverflow
검색결과) jekyll 테마와 호환성 문제 발생
2. 1번으로 수행해도 잘 안될시 받은 테마의 Gemfile.lock 에 가서 버전호환을 확인해야 한다

