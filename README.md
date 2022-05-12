# atlantis

Dieses Repository ist das Frontend für Atlantis, ein Controlling-System für Budgeterstellung, Forecast und für Ist/Soll Analysen.

Als Framework wurde Angular verwendet.

Bemerkungen:

- es wurden Kendo UI Angular Komponenten benutzt (nicht lizensiert, deshalb auch die console Warnungen)
- die Komponenten wurden umfangreich umgestylet (ich wollte keine Bootstrap o. Material Design verwenden und vom Gewohnten etwas abheben)
- das Sidebar wurde mit hierarchischer Darstellung und Suchfunktion verbessert (siehe dazu 'sidebar.component.ts' und 'sidebar.service.ts')
- das App unterstützt 3 Sprachen (hu, de, en); die Sprache wird automatisch erkannt; wenn die Sprache nicht unterstützt wird, wird 'en' als Default eingestellt
- zur Authentifizierung wird jwt verwendet
- das App hat auch einen Admin-Bereich
- es wurde so viel, wie möglich ausgelagert und wiederverwendet (siehe 'shared' Ordner)
