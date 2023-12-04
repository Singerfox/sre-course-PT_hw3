# Нагрузочное тестирование на приложение.
1. Так как приложение тестовое и у нас нет бизнес заказчика, который бы хоть как-то объяснил кто и как будет использовать данное приложение, то будем считать нормальным следующие допущения: <br />
   Фиксированное количество городов в БД (у меня 4) <br />
   Для каждого города есть 1 актуальный прогноз погоды <br />
   Обновляется погода не нашим приложением, т.е. обновление данных в БД не оказывает никакого воздейстия на производительность тестового приложения. <br />
   Вся нагрузка идёт на эндпоинт WeatherForecast
3. Нагрузка реализована в виде скриптов для k6.
   
   load-test.js - тест с околомаксимальной нагрузкой, но не вызывающей выхода за пределы заданных параметров приложения (SLO) <br />
   kill-test.js - тест с линейно нарастающей нагрузкой. Цель скрипта - выявить максимальную нагрзку, вызывающую отказ в обслуживании (любые ответы не равные 200 ОК).
   
5. Требования к приложению (SLO):
   
   Количество ошибок меньше 1% <br />
   Среднее время ответа p(90) не более 500 мс <br />
   
7. Производительность системы очень сильно зависит от количества данных в БД (ввиду неоптимально написанного запроса WeatherForecast) и от количества подов в кластере, а также от времени суток (причём производительность гуляет достаточно сильно, предполагаю что это из-за общего кластера). <br />
   По результатам несколих десятков прогонов максимальная стабильная производительность достигнута на уровне 320-340 RPS для запроса WeatherForecast (на скриншоте ниже видно загрузку CPU подов почти в 100%):
   <img src='k6_img\k6_VUs_latency.png'>
