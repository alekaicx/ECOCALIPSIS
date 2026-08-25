' =========================================================================
' Ecocalipsis - Utilities & Persistence (source/utils.brs)
' =========================================================================

' Registry Section Management (Local Persistent Storage on Roku)
function GetRegistrySection(sectionName = "EcocalipsisSettings" as String) as Object
    return CreateObject("roRegistrySection", sectionName)
end function

function SaveRegistryValue(key as String, value as String, sectionName = "EcocalipsisSettings" as String) as Boolean
    sec = GetRegistrySection(sectionName)
    sec.Write(key, value)
    return sec.Flush()
end function

function GetRegistryValue(key as String, defaultValue = "" as String, sectionName = "EcocalipsisSettings" as String) as String
    sec = GetRegistrySection(sectionName)
    if sec.Exists(key)
        return sec.Read(key)
    end if
    return defaultValue
end function

' Student Profile & Scores
function LoadStudentProfile() as Object
    sec = GetRegistrySection("EcocalipsisProfile")
    profile = {
        name: "Estudiante Pío X",
        grade: "6° A",
        points: 150,
        treesSaved: 12,
        waterLiters: 450,
        completedWorkshops: [1, 2],
        unlockedBadges: ["Semilla Verde", "Guardián del Páramo"]
    }

    if sec.Exists("name") then profile.name = sec.Read("name")
    if sec.Exists("grade") then profile.grade = sec.Read("grade")
    if sec.Exists("points") then profile.points = sec.Read("points").ToInt()
    if sec.Exists("treesSaved") then profile.treesSaved = sec.Read("treesSaved").ToInt()
    if sec.Exists("waterLiters") then profile.waterLiters = sec.Read("waterLiters").ToInt()
    
    return profile
end function

function SaveStudentProfile(profile as Object) as Boolean
    sec = GetRegistrySection("EcocalipsisProfile")
    if profile.name <> invalid then sec.Write("name", profile.name)
    if profile.grade <> invalid then sec.Write("grade", profile.grade)
    if profile.points <> invalid then sec.Write("points", profile.points.ToStr())
    if profile.treesSaved <> invalid then sec.Write("treesSaved", profile.treesSaved.ToStr())
    if profile.waterLiters <> invalid then sec.Write("waterLiters", profile.waterLiters.ToStr())
    return sec.Flush()
end function

' Format time in seconds to mm:ss or hh:mm:ss
function FormatSecondsToTime(totalSeconds as Integer) as String
    if totalSeconds < 0 then totalSeconds = 0
    hours = Fix(totalSeconds / 3600)
    minutes = Fix((totalSeconds MOD 3600) / 60)
    seconds = totalSeconds MOD 60

    minStr = minutes.ToStr()
    if minutes < 10 then minStr = "0" + minStr

    secStr = seconds.ToStr()
    if seconds < 10 then secStr = "0" + secStr

    if hours > 0
        hourStr = hours.ToStr()
        if hours < 10 then hourStr = "0" + hourStr
        return hourStr + ":" + minStr + ":" + secStr
    else
        return minStr + ":" + secStr
    end if
end function

' Workshop list provider with high quality streams & educational descriptions
function GetWorkshopsData() as Object
    workshops = [
        {
            id: 1,
            title: "Cine-Foro: El Lorax y la Deforestación",
            subtitle: "Protección de los árboles y la biodiversidad",
            category: "Cine Ambiental",
            duration: "1h 26m",
            level: "Básica y Media",
            icon: "pkg:/images/ic_movie.png",
            thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
            videoUrl: "https://commondatastream.feedroom.com/crossroads/c_524/1109/2012/1109_2012_720.mp4",
            streamFormat: "mp4",
            description: "Acompaña al Lorax en esta historia sobre las consecuencias de la tala indiscriminada y la importancia de que cada estudiante tome la iniciativa para sembrar y proteger la vida en el planeta.",
            keyQuestions: [
                "¿Por qué el Once-ler destruyó el bosque de Truffula?",
                "¿Qué representa el mensaje 'A MENOS QUE' que dejó el Lorax?",
                "¿Cómo podemos aplicar esta lección en la IED Pío X?"
            ]
        },
        {
            id: 2,
            title: "Taller del Agua: Guardianes del Sumapaz",
            subtitle: "El páramo más grande del mundo y su ciclo hídrico",
            category: "Recursos Hídricos",
            duration: "18 min",
            level: "Todos los Grados",
            icon: "pkg:/images/ic_water.png",
            thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
            videoUrl: "https://commondatastream.feedroom.com/crossroads/c_524/1109/2012/1109_2012_720.mp4",
            streamFormat: "mp4",
            description: "Aprende cómo los frailejones atrapan la niebla en el Páramo de Sumapaz para alimentar los ríos que abastecen a Cundinamarca y Bogotá. Incluye consejos para no desperdiciar agua en el colegio.",
            keyQuestions: [
                "¿Qué función cumplen las hojas afelpadas del frailejón?",
                "¿Cuántos litros de agua podemos ahorrar cerrando la llave al lavarnos las manos?"
            ]
        },
        {
            id: 3,
            title: "Código de Colores: El Arte del Reciclaje",
            subtitle: "Resolución 2184 y separación en la fuente",
            category: "Residuos Sólidos",
            duration: "14 min",
            level: "Primaria y Secundaria",
            icon: "pkg:/images/ic_recycle.png",
            thumbnail: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80",
            videoUrl: "https://commondatastream.feedroom.com/crossroads/c_524/1109/2012/1109_2012_720.mp4",
            streamFormat: "mp4",
            description: "Domina las 3 canecas oficiales: Blanca (plástico, papel, metal, vidrio limpio), Verde (residuos orgánicos aprovechables) y Negra (papel higiénico, servilletas y desechos no aprovechables).",
            keyQuestions: [
                "¿En qué caneca va una botella de plástico de jugo enjuagada?",
                "¿Por qué es peligroso mezclar restos de comida con papel reciclable?"
            ]
        },
        {
            id: 4,
            title: "Energía Limpia y Huella de Carbono",
            subtitle: "Cero Vampiros Eléctricos en el Aula",
            category: "Eficiencia Energética",
            duration: "12 min",
            level: "Secundaria",
            icon: "pkg:/images/ic_energy.png",
            thumbnail: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=80",
            videoUrl: "https://commondatastream.feedroom.com/crossroads/c_524/1109/2012/1109_2012_720.mp4",
            streamFormat: "mp4",
            description: "Conoce el impacto del consumo fantasma de energía y cómo el uso de bombillas LED y la desconexión de aparatos reduce las emisiones de gases de efecto invernadero.",
            keyQuestions: [
                "¿Qué es un consumo vampiro eléctrico?",
                "¿Cómo ayuda apagar los monitores de la sala de sistemas cuando no se usan?"
            ]
        }
    ]
    return workshops
end function

' Trivia Questions Data
function GetTriviaQuestions() as Object
    questions = [
        {
            question: "¿En qué caneca según el código colombiano (Res. 2184) debes depositar una botella plástica limpia?",
            options: ["A. Caneca Negra", "B. Caneca Blanca", "C. Caneca Verde", "D. En el piso"],
            correctIndex: 1,
            explanation: "¡Correcto! En la Caneca Blanca van los residuos aprovechables: plástico, vidrio, metales, papel y cartón limpios."
        },
        {
            question: "¿Cuál es la función principal de los frailejones en el Páramo de Sumapaz?",
            options: ["A. Capturar la niebla y regular el agua", "B. Producir leña para el fuego", "C. Dar sombra a los turistas", "D. Ninguna"],
            correctIndex: 0,
            explanation: "¡Excelente! Los frailejones son esponjas naturales que retienen agua de la niebla y la liberan a ríos y lagunas."
        },
        {
            question: "¿Qué significa el término 'Vampiro Eléctrico' en tu hogar o colegio?",
            options: ["A. Un murciélago en el techo", "B. Aparatos apagados que siguen consumiendo energía al estar conectados", "C. Un bombillo fluorescente", "D. Un panel solar"],
            correctIndex: 1,
            explanation: "¡Muy bien! Los cargadores y electrodomésticos conectados siguen gastando hasta un 10% de electricidad sin usarse."
        },
        {
            question: "En la película El Lorax, ¿qué mensaje dejó grabado el Lorax en las piedras antes de irse?",
            options: ["A. 'CORTEN MÁS'", "B. 'ADIÓS A TODOS'", "C. 'A MENOS QUE'", "D. 'NO TOQUEN'"],
            correctIndex: 2,
            explanation: "¡Exacto! 'A MENOS QUE alguien como tú se preocupe de verdad, nada va a mejorar, jamás.'"
        },
        {
            question: "¿Cuánto tiempo promedio debería durar una ducha ecológica para ahorrar agua?",
            options: ["A. 25 a 30 minutos", "B. 3 a 5 minutos", "C. 1 hora", "D. 45 minutos"],
            correctIndex: 1,
            explanation: "¡Excelente! Con una ducha de 5 minutos ahorras hasta 100 litros de agua frente a un baño prolongado."
        }
    ]
    return questions
end function
