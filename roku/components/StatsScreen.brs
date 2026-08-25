' =========================================================================
' Ecocalipsis - StatsScreen Controller (components/StatsScreen.brs)
' =========================================================================

sub init()
    m.statsProfileName = m.top.findNode("statsProfileName")
    m.statsPoints = m.top.findNode("statsPoints")

    profile = LoadStudentProfile()
    if profile <> invalid
        m.statsProfileName.text = profile.name + " · Grado " + profile.grade
        m.statsPoints.text = "⭐ Puntos Totales: " + profile.points.ToStr() + " Pts"
    end if
end sub
