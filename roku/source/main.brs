' =========================================================================
' Ecocalipsis - IED Pío X - Roku OS Channel
' Main Entry Point (source/main.brs)
' =========================================================================

sub Main(args as Dynamic)
    print "********************************************************"
    print "  ECOCALIPSIS - IED PIO X (Roku OS Native Channel)"
    print "  Starting Application..."
    print "********************************************************"

    ' Initialize Screen
    screen = CreateObject("roSGScreen")
    m.port = CreateObject("roMessagePort")
    screen.SetMessagePort(m.port)

    ' Create Main SceneGraph Scene
    m.scene = screen.CreateScene("MainScene")
    screen.Show()

    ' Pass Launch Deep Links / Arguments to Scene
    if args <> invalid
        m.scene.launchArgs = args
    end if

    ' Event loop to keep channel active
    while true
        msg = wait(0, m.port)
        msgType = type(msg)
        if msgType = "roSGScreenEvent"
            if msg.isScreenClosed()
                print "Ecocalipsis screen closed by user or system. Terminating gracefully."
                return
            end if
        end if
    end while
end sub
