# Random Walk (Losowy Spacer) w 2D jako Metoda Monte Carlo

## Wprowadzenie

W funkcji `simulateBrownianMotion` wykorzystana jest metoda Monte Carlo do symulacji losowego ruchu cząsteczki. Ta metoda jest znana jako **Random Walk** (losowy spacer) lub **Random Walk in 2D** (losowy spacer w dwóch wymiarach).

## Opis Metody

#### 1. Generowanie Losowych Kątów

W każdym kroku symulacji generowany jest losowy kąt za pomocą **Math.random() _ 2 _ Math.PI**. Losowy kąt jest generowany z zakresu **[0, 2π]**, co oznacza, że kierunek ruchu jest całkowicie losowy i może być dowolnym kierunkiem na płaszczyźnie.

#### 2. Obliczanie nowych współrzędnych

Obliczanie nowych współrzędnych: Na podstawie wygenerowanego losowego kąta obliczane są nowe współrzędne (x, y) za pomocą funkcji trygonometrycznych Math.cos(angle) i Math.sin(angle). Te funkcje zwracają odpowiednio wartości x i y przesunięcia jednostkowego w kierunku losowo wybranego kąta.

#### 3. Aktualizacja pozycji

Aktualna pozycja cząsteczki jest aktualizowana przez dodanie obliczonych przesunięć do bieżących współrzędnych.
