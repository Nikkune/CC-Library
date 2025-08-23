--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
local function __TS__Class(self)
    local c = {prototype = {}}
    c.prototype.__index = c.prototype
    c.prototype.constructor = c
    return c
end

local function __TS__ArrayFind(self, predicate, thisArg)
    for i = 1, #self do
        local elem = self[i]
        if predicate(thisArg, elem, i - 1, self) then
            return elem
        end
    end
    return nil
end

local function __TS__ArrayIndexOf(self, searchElement, fromIndex)
    if fromIndex == nil then
        fromIndex = 0
    end
    local len = #self
    if len == 0 then
        return -1
    end
    if fromIndex >= len then
        return -1
    end
    if fromIndex < 0 then
        fromIndex = len + fromIndex
        if fromIndex < 0 then
            fromIndex = 0
        end
    end
    for i = fromIndex + 1, len do
        if self[i] == searchElement then
            return i - 1
        end
    end
    return -1
end

local function __TS__ArraySort(self, compareFn)
    if compareFn ~= nil then
        table.sort(
            self,
            function(a, b) return compareFn(nil, a, b) < 0 end
        )
    else
        table.sort(self)
    end
    return self
end

local function __TS__StringSubstring(self, start, ____end)
    if ____end ~= ____end then
        ____end = 0
    end
    if ____end ~= nil and start > ____end then
        start, ____end = ____end, start
    end
    if start >= 0 then
        start = start + 1
    else
        start = 1
    end
    if ____end ~= nil and ____end < 0 then
        ____end = 0
    end
    return string.sub(self, start, ____end)
end

local function __TS__CountVarargs(...)
    return select("#", ...)
end

local function __TS__ArraySplice(self, ...)
    local args = {...}
    local len = #self
    local actualArgumentCount = __TS__CountVarargs(...)
    local start = args[1]
    local deleteCount = args[2]
    if start < 0 then
        start = len + start
        if start < 0 then
            start = 0
        end
    elseif start > len then
        start = len
    end
    local itemCount = actualArgumentCount - 2
    if itemCount < 0 then
        itemCount = 0
    end
    local actualDeleteCount
    if actualArgumentCount == 0 then
        actualDeleteCount = 0
    elseif actualArgumentCount == 1 then
        actualDeleteCount = len - start
    else
        actualDeleteCount = deleteCount or 0
        if actualDeleteCount < 0 then
            actualDeleteCount = 0
        end
        if actualDeleteCount > len - start then
            actualDeleteCount = len - start
        end
    end
    local out = {}
    for k = 1, actualDeleteCount do
        local from = start + k
        if self[from] ~= nil then
            out[k] = self[from]
        end
    end
    if itemCount < actualDeleteCount then
        for k = start + 1, len - actualDeleteCount do
            local from = k + actualDeleteCount
            local to = k + itemCount
            if self[from] then
                self[to] = self[from]
            else
                self[to] = nil
            end
        end
        for k = len - actualDeleteCount + itemCount + 1, len do
            self[k] = nil
        end
    elseif itemCount > actualDeleteCount then
        for k = len - actualDeleteCount, start + 1, -1 do
            local from = k + actualDeleteCount
            local to = k + itemCount
            if self[from] then
                self[to] = self[from]
            else
                self[to] = nil
            end
        end
    end
    local j = start + 1
    for i = 3, actualArgumentCount do
        self[j] = args[i]
        j = j + 1
    end
    for k = #self, len - actualDeleteCount + itemCount + 1, -1 do
        self[k] = nil
    end
    return out
end

local function __TS__New(target, ...)
    local instance = setmetatable({}, target.prototype)
    instance:____constructor(...)
    return instance
end
-- End of Lua Library inline imports
local ____exports = {}
local draw_utils = require("APIs.draw_utils")
local ____draw_utils = require("APIs.draw_utils")
local TextAlignment = ____draw_utils.TextAlignment
local framer = require("APIs.frames")
local GatewayStatus = GatewayStatus or ({})
GatewayStatus.OK = "OK"
GatewayStatus.WARNING = "WARNING"
GatewayStatus.ERROR = "ERROR"
GatewayStatus.MAINTENANCE = "MAINTENANCE"
GatewayStatus.LOST = "LOST"
--- -------------------- CONFIGURATION -------------------- *
local CONFIG = {PERIPHERALS = {MONITOR_SIDE = "top", MODEM_SIDE = "left"}, TIMING = {LOST_THRESHOLD = 30, REMOVE_THRESHOLD = 90, BLINK_INTERVAL = 0.2, REFRESH_RATE = 30}, DISPLAY = {
    GATEWAY_WIDTH = 16,
    TEXT_SCALE = 0.5,
    MAX_LOGS = 50,
    TITLE = "Datacenter",
    Y_OFFSET = 6
}}
--- The GatewayMonitor class is responsible for monitoring gateway devices,
-- displaying their statuses on a screen, and logging updates. It manages
-- multiple UI components such as a gateway status display and a log viewer.
-- The class also listens for updates received via a modem and processes
-- status changes for gateways.
local GatewayMonitor = __TS__Class()
GatewayMonitor.name = "GatewayMonitor"
function GatewayMonitor.prototype.____constructor(self)
    self.gateways = {}
    self.logs = {}
    self:initializePeripherals()
    self.monitorFramer = framer.MonitorFramer:getInstance()
    self.drawer = draw_utils.MonitorDrawer:getInstance()
    self:setupDisplay()
    self.gatewaysFrame = self:createGatewaysFrame()
    self.logFrame = self:createLogFrame()
end
function GatewayMonitor.prototype.initializePeripherals(self)
    self.monitor = peripheral.wrap(CONFIG.PERIPHERALS.MONITOR_SIDE) or error("No monitor found")
    self.modem = peripheral.wrap(CONFIG.PERIPHERALS.MODEM_SIDE) or error("No modem found")
    self.monitor.setTextScale(CONFIG.DISPLAY.TEXT_SCALE)
    rednet.open(peripheral.getName(self.modem))
end
function GatewayMonitor.prototype.setupDisplay(self)
    local monitorWidth, _ = self.monitor.getSize()
    self.monitorFramer:setMonitor(self.monitor)
    self.drawer:setMonitor(self.monitor)
    self.monitorFramer:clearMonitor()
    self.monitorFramer:setRefreshRate(CONFIG.TIMING.REFRESH_RATE)
    self:drawTitle(monitorWidth)
end
function GatewayMonitor.prototype.drawTitle(self, monitorWidth)
    local title = CONFIG.DISPLAY.TITLE
    local pad = monitorWidth - 2 - #title
    self.monitor.setBackgroundColor(colors.cyan)
    self.monitor.setTextColor(colors.white)
    self.monitor.setCursorPos(2, 2)
    self.monitor.write(string.rep(" ", monitorWidth - 2))
    self.monitor.setCursorPos(2, 3)
    self.monitor.write(string.rep(
        " ",
        math.floor(pad / 2)
    ))
    self.monitor.write(title)
    self.monitor.write(string.rep(
        " ",
        math.ceil(pad / 2)
    ))
    self.monitor.setCursorPos(2, 4)
    self.monitor.write(string.rep(" ", monitorWidth - 2))
    self.monitor.setBackgroundColor(colors.black)
end
function GatewayMonitor.prototype.createGatewaysFrame(self)
    local monitorWidth, monitorHeight = self.monitor.getSize()
    return self.monitorFramer:create(
        2,
        CONFIG.DISPLAY.Y_OFFSET,
        monitorWidth / 3 * 2 - 2,
        monitorHeight - CONFIG.DISPLAY.Y_OFFSET,
        {borderColor = colors.cyan, title = "Gateways"}
    )
end
function GatewayMonitor.prototype.createLogFrame(self)
    local monitorWidth, monitorHeight = self.monitor.getSize()
    return self.monitorFramer:create(
        monitorWidth / 3 * 2 + 1,
        CONFIG.DISPLAY.Y_OFFSET,
        monitorWidth / 3,
        monitorHeight - CONFIG.DISPLAY.Y_OFFSET,
        {borderColor = colors.blue, title = "Logs"}
    )
end
function GatewayMonitor.prototype.start(self)
    self:createElements()
    self:createLogElements()
    print("To send a message to the datacenter")
    print("Use the id : " .. tostring(os.getComputerID()))
    parallel.waitForAny(
        function() return self.monitorFramer:loop() end,
        function() return self:messageLookUp() end
    )
end
function GatewayMonitor.prototype.handleGatewayUpdate(self, gatewayName, status, message)
    local gateway = __TS__ArrayFind(
        self.gateways,
        function(____, g) return g.name == gatewayName end
    )
    local currentTime = os.clock()
    if gateway then
        if gateway.status ~= status then
            self:addLog(((gatewayName .. " : ") .. status) .. " !")
            if gateway.message ~= message then
                self:addLog((gatewayName .. " : ") .. message)
            end
        end
        gateway.message = message
        gateway.status = status
        gateway.lastSeen = currentTime
    else
        self:addLog(("New " .. gatewayName) .. " detected !")
        local ____self_gateways_0 = self.gateways
        ____self_gateways_0[#____self_gateways_0 + 1] = {name = gatewayName, status = status, lastSeen = currentTime, message = nil}
    end
end
function GatewayMonitor.prototype.messageLookUp(self)
    while true do
        local id, message = rednet.receive(nil, 0.1)
        if id and message.type == "status_update" and message.name then
            self:handleGatewayUpdate(message.name, message.status, message.message)
        end
        self:checkGatewaysStatus()
        self:createElements()
    end
end
function GatewayMonitor.prototype.getGatewayPosition(self, width, gateway)
    local index = __TS__ArrayIndexOf(self.gateways, gateway)
    local columns = math.max(
        1,
        math.floor(width / (CONFIG.DISPLAY.GATEWAY_WIDTH + 2))
    )
    local totalWidth = columns * (CONFIG.DISPLAY.GATEWAY_WIDTH + 2) - 2
    local startX = math.floor((width - totalWidth) / 2) - 1
    local x = startX + index % columns * (CONFIG.DISPLAY.GATEWAY_WIDTH + 2)
    local y = 2 + math.floor(index / columns) * 4
    return {x = x, y = y}
end
function GatewayMonitor.prototype.createElements(self)
    local drawer = self.drawer
    local gateways = self.gateways
    if #gateways == 0 then
        if not self.gatewaysFrame:hasElement("waiting") then
            self.gatewaysFrame:markRedraw()
            self.logFrame:markRedraw()
            local element = {
                id = "waiting",
                toDraw = true,
                params = {frames = {[1] = "Waiting for gateways", [2] = "Waiting for gateways.", [3] = "Waiting for gateways..", [4] = "Waiting for gateways..."}, writeState = 1, lastUpdate = 0, threshold = 0.5},
                draw = function(self, frame, monitor)
                    local y = math.floor(frame:getInnerHeight() / 2)
                    local screenPosition = frame:toScreenCoords(1, y)
                    local text = self.params.frames[self.params.writeState]
                    local padding = (frame:getInnerWidth() - #text - 1) / 2
                    monitor.setCursorPos(screenPosition.x, screenPosition.y)
                    monitor.write(string.rep(" ", padding))
                    monitor.write(text)
                    monitor.write(string.rep(" ", padding))
                    self.toDraw = false
                end,
                refresh = function(self, _frame, deltaTime)
                    local ____self_params_1, ____lastUpdate_2 = self.params, "lastUpdate"
                    ____self_params_1[____lastUpdate_2] = ____self_params_1[____lastUpdate_2] + deltaTime
                    if self.params.lastUpdate >= self.params.threshold then
                        local ____self_params_3, ____writeState_4 = self.params, "writeState"
                        ____self_params_3[____writeState_4] = ____self_params_3[____writeState_4] + 1
                        if self.params.writeState > 4 then
                            self.params.writeState = 1
                        end
                        self.params.lastUpdate = 0
                        self.toDraw = true
                    end
                end
            }
            self.gatewaysFrame:addElement(element)
        end
    else
        if self.gatewaysFrame:hasElement("waiting") then
            self.gatewaysFrame:removeElement("waiting")
            self.gatewaysFrame:markRedraw()
        end
        local sortedGateways = __TS__ArraySort(
            self.gateways,
            function(____, a, b) return a.name < b.name and -1 or (a.name > b.name and 1 or 0) end
        )
        for ____, gateway in ipairs(sortedGateways) do
            local element = self.gatewaysFrame:getElement(gateway.name)
            local position = self:getGatewayPosition(
                self.gatewaysFrame:getWidth(),
                gateway
            )
            if element then
                element.params.x = position.x
                element.params.y = position.y
                element.params.state = gateway.status or GatewayStatus.OK
                element.toDraw = true
            else
                local element = {
                    id = gateway.name,
                    toDraw = true,
                    params = {
                        x = position.x,
                        y = position.y,
                        width = CONFIG.DISPLAY.GATEWAY_WIDTH,
                        height = 3,
                        state = gateway.status or GatewayStatus.OK,
                        lastBlink = 0,
                        blink = false
                    },
                    draw = function(self, frame, _monitor)
                        local color = colors.white
                        repeat
                            local ____switch35 = self.params.state
                            local ____cond35 = ____switch35 == GatewayStatus.OK
                            if ____cond35 then
                                color = colors.green
                                break
                            end
                            ____cond35 = ____cond35 or ____switch35 == GatewayStatus.WARNING
                            if ____cond35 then
                                local ____table_params_blink_5
                                if self.params.blink then
                                    ____table_params_blink_5 = colors.yellow
                                else
                                    ____table_params_blink_5 = colors.orange
                                end
                                color = ____table_params_blink_5
                                break
                            end
                            ____cond35 = ____cond35 or ____switch35 == GatewayStatus.ERROR
                            if ____cond35 then
                                local ____table_params_blink_6
                                if self.params.blink then
                                    ____table_params_blink_6 = colors.red
                                else
                                    ____table_params_blink_6 = colors.black
                                end
                                color = ____table_params_blink_6
                                break
                            end
                            ____cond35 = ____cond35 or ____switch35 == GatewayStatus.MAINTENANCE
                            if ____cond35 then
                                local ____table_params_blink_7
                                if self.params.blink then
                                    ____table_params_blink_7 = colors.magenta
                                else
                                    ____table_params_blink_7 = colors.pink
                                end
                                color = ____table_params_blink_7
                                break
                            end
                            ____cond35 = ____cond35 or ____switch35 == GatewayStatus.LOST
                            if ____cond35 then
                                local ____table_params_blink_8
                                if self.params.blink then
                                    ____table_params_blink_8 = colors.white
                                else
                                    ____table_params_blink_8 = colors.black
                                end
                                color = ____table_params_blink_8
                                break
                            end
                            do
                                color = colors.white
                            end
                        until true
                        local label = gateway.name
                        if #label > self.params.width then
                            label = __TS__StringSubstring(label, 0, self.params.width - 3) .. "..."
                        end
                        local screenPosition = frame:toScreenCoords(self.params.x, self.params.y)
                        drawer:drawFilledRect(
                            screenPosition.x,
                            screenPosition.y,
                            self.params.width,
                            self.params.height,
                            color
                        )
                        local ____drawer_drawText_16 = drawer.drawText
                        local ____label_10 = label
                        local ____TextAlignment_CENTER_11 = TextAlignment.CENTER
                        local ____screenPosition_x_12 = screenPosition.x
                        local ____screenPosition_y_13 = screenPosition.y
                        local ____temp_14 = screenPosition.x + self.params.width
                        local ____temp_15 = screenPosition.y + self.params.height
                        local ____temp_9
                        if color == colors.white then
                            ____temp_9 = colors.black
                        else
                            ____temp_9 = colors.white
                        end
                        ____drawer_drawText_16(drawer, {
                            text = ____label_10,
                            alignment = ____TextAlignment_CENTER_11,
                            x1 = ____screenPosition_x_12,
                            y1 = ____screenPosition_y_13,
                            x2 = ____temp_14,
                            y2 = ____temp_15,
                            textColor = ____temp_9,
                            backgroundColor = color
                        })
                    end,
                    refresh = function(self, _frame, deltaTime)
                        self.params.lastBlink = (self.params.lastBlink or 0) + deltaTime
                        if self.params.lastBlink > CONFIG.TIMING.BLINK_INTERVAL then
                            self.params.lastBlink = 0
                            self.params.blink = not self.params.blink
                            self.toDraw = true
                        end
                    end
                }
                self.gatewaysFrame:addElement(element)
            end
        end
    end
end
function GatewayMonitor.prototype.addLog(self, message)
    local time = os.date("%H:%M")
    local maxLogLength = self.logFrame:getInnerWidth() - 2
    local text = (tostring(time) .. " ") .. message
    if #text > maxLogLength then
        text = __TS__StringSubstring(text, 0, maxLogLength - 3) .. "..."
    end
    local ____self_logs_17 = self.logs
    ____self_logs_17[#____self_logs_17 + 1] = text
    if #self.logs > 50 then
        table.remove(self.logs, 1)
    end
    self.logFrame:markRedraw()
end
function GatewayMonitor.prototype.createLogElements(self)
    local logs = self.logs
    local logElement = {
        id = "logs",
        toDraw = true,
        params = nil,
        draw = function(self, frame, monitor)
            local innerHeight = frame:getInnerHeight() - 2
            local innerWidth = frame:getInnerWidth() - 1
            do
                local i = 0
                while i < innerHeight do
                    local screenPos = frame:toScreenCoords(1, i + 1)
                    monitor.setBackgroundColor(colors.black)
                    monitor.setCursorPos(screenPos.x, screenPos.y)
                    monitor.write(string.rep(" ", innerWidth))
                    i = i + 1
                end
            end
            do
                local i = 0
                while i < innerHeight and i < #logs do
                    monitor.setBackgroundColor(colors.black)
                    monitor.setTextColor(colors.green)
                    local screenPos = frame:toScreenCoords(1, innerHeight - i)
                    monitor.setCursorPos(screenPos.x, screenPos.y)
                    monitor.write(logs[#logs - 1 - i + 1] or "")
                    i = i + 1
                end
            end
            monitor.setTextColor(colors.white)
        end,
        refresh = function(self, _frame, _deltaTime)
            return
        end
    }
    self.logFrame:addElement(logElement)
end
function GatewayMonitor.prototype.checkGatewaysStatus(self)
    local currentTime = os.clock()
    for ____, gateway in ipairs(self.gateways) do
        local timeSinceLastSeen = currentTime - gateway.lastSeen
        if timeSinceLastSeen > CONFIG.TIMING.LOST_THRESHOLD and timeSinceLastSeen < CONFIG.TIMING.REMOVE_THRESHOLD then
            if gateway.status ~= GatewayStatus.LOST then
                self:addLog(gateway.name .. " lost !")
                gateway.status = GatewayStatus.LOST
            end
        end
        if timeSinceLastSeen > CONFIG.TIMING.REMOVE_THRESHOLD then
            self:addLog(gateway.name .. " removed !")
            __TS__ArraySplice(
                self.gateways,
                __TS__ArrayIndexOf(self.gateways, gateway),
                1
            )
            self.gatewaysFrame:removeElement(gateway.name)
            self.gatewaysFrame:markRedraw()
            self.logFrame:markRedraw()
        end
    end
end
local monitor = __TS__New(GatewayMonitor)
monitor:start()
return ____exports
