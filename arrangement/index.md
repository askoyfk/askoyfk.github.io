---
layout: collections-list
title: Arrangement
permalink: /arrangement/
---

Oversikt over arrangementene

<ul>

{% for arrangement in site.arrangement %}
  <li>navn: {{ arrangement.title }}</li>
{% endfor %}

</ul>
