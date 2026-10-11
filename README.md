# Trolejbus Simulator

Jednoduchý webový prototyp realistické řídicí kabiny trolejbusu vytvořený v HTML, CSS a JavaScript.

## Co obsahuje
- rozhraní kabiny s páčkami a tlačítky
- simulace pohybu, směru, brzdění a zrychlení
- ovládání pantografu, hlavního vypínače, ruční brzdy a dveří
- statusy výkonu, napětí, proudu a kontaktu s vedením
- jednoduchá logika poruch a nouzových režimů

## Souborová struktura
- `index.html` – layout panelu
- `styles.css` – design kabiny a ovládacích prvků
- `script.js` – logika simulace a interakce

## Jak spustit
Jednoduše otevři soubor `index.html` v prohlížeči.

Pro lepší vzhled doporučuji otevřít v moderním prohlížeči, například Chrome nebo Edge.

## Rozvržení panelu
- levá strana: pantograf, hlavní vypínač, plyn, brzda, ruční brzda, dveře, klakson
- střed: směrové přepínače, světla, režimy a stav vozidla
- pravá strana: zastávka, linka, režimy a reset poruch

## Rekapitulace realismu
- rychlost reaguje na výkon a brzdu
- dveře se otevírají jen při nulové rychlosti
- pantograf a hlavní napájení jsou povinné pro jízdu
- ruční brzda a nouzový režim zastavují vůz
- vozidlo má základní logiku provozu podobnou reálnému trolejbusu

## Rozšíření v budoucnu
- 3D kabina a vozidlo
- zvukové efekty
- více poruch a režimů provozu
- více zastávek a simulace linky
- přidání autopilota, orientace na lince a semaforů
