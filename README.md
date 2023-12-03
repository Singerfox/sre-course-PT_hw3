# Нагрузочное тестирование на приложение.
1. Так как приложение тестовое и у нас нет бизнес заказчика, который бы хоть как-то объяснил кто и как будет использовать данное приложение, то будем считать нормальным следующие допущения:
   Фиксированное количество городов в БД (у меня 4)
   Для каждого города есть 1 актуальный прогноз погоды
   Обновляется погода не нашим приложением, т.е. обновление данных в БД не оказывает никакого воздейстия на производительность тестового приложения.
   Вся нагрузка идёт на эндпоинт WeatherForecast
3. Нагрузка реализована в виде скриптов для k6.
   load-test.js - тест с околомаксимальной нагрузкой, но не вызывающей выхода за пределы заданных параметров приложения (SLO)
   kill-test.js - тест с линейно нарастающей нагрузкой. Цель скрипта - выявить максимальную нагрзку, вызывающую отказ в обслуживании (любые ответы не равные 200 ОК).
4. Требования к приложению (SLO):
   Количество ошибок меньше 1%
   Среднее время ответа p(95) не более 500 мс
5. Производительность системы очень сильно зависит от количества данных в БД (ввиду неоптимально написанного запроса WeatherForecast) и от количества подов в кластере, а также от времени суток (причём производительность гуляет достаточно сильно, предполагаю что это из-за общего кластера).
   По результатам несколих десятков прогонов максимальная стабильная производительность достигнута на уровне 320 RPS для запроса WeatherForecast.
