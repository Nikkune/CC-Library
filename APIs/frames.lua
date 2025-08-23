--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
local function __TS__Class(self)
    local c = {prototype = {}}
    c.prototype.__index = c.prototype
    c.prototype.constructor = c
    return c
end

local function __TS__New(target, ...)
    local instance = setmetatable({}, target.prototype)
    instance:____constructor(...)
    return instance
end

local function __TS__ArrayFilter(self, callbackfn, thisArg)
    local result = {}
    local len = 0
    for i = 1, #self do
        if callbackfn(thisArg, self[i], i - 1, self) then
            len = len + 1
            result[len] = self[i]
        end
    end
    return result
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

local function __TS__ArraySome(self, callbackfn, thisArg)
    for i = 1, #self do
        if callbackfn(thisArg, self[i], i - 1, self) then
            return true
        end
    end
    return false
end
-- End of Lua Library inline imports
local ____exports = {}
local draw_utils = require("APIs.draw_utils")
local math_utils = require("APIs.math_utils")
local MONITOR_ERROR = "Monitor not found. Please set it with MonitorDrawer.setMonitor(monitor)"
____exports.MonitorFramer = __TS__Class()
local MonitorFramer = ____exports.MonitorFramer
MonitorFramer.name = "MonitorFramer"
function MonitorFramer.prototype.____constructor(self)
    self.context = {
        monitor = nil,
        last_refresh = 0,
        refresh_rate = 1,
        frames = {},
        drawer = draw_utils.MonitorDrawer:getInstance()
    }
end
function MonitorFramer.getInstance(self)
    if not self.instance then
        self.instance = __TS__New(____exports.MonitorFramer)
    end
    return self.instance
end
function MonitorFramer.prototype.setMonitor(self, monitor)
    self.context.monitor = monitor
end
function MonitorFramer.prototype.validateMonitor(self)
    if not self.context.monitor then
        error(MONITOR_ERROR)
    end
    return self.context.monitor
end
function MonitorFramer.prototype.setRefreshRate(self, rate)
    self.context.refresh_rate = rate
end
function MonitorFramer.prototype.clearMonitor(self, backgroundColor)
    local monitor = self:validateMonitor()
    local color = backgroundColor or colors.black
    monitor.setBackgroundColor(color)
    monitor.clear()
end
function MonitorFramer.prototype.create(self, x, y, width, height, params)
    self:validateMonitor()
    local frameContext = {
        x = x,
        y = y,
        width = width,
        height = height,
        borderColor = params and params.borderColor or colors.gray,
        fillColor = params and params.fillColor or colors.black,
        gapColor = params and params.gapColor or colors.black,
        title = params and params.title or nil,
        elements = {},
        toDraw = true
    }
    local frame = __TS__New(
        ____exports.Frame,
        frameContext,
        self:validateMonitor(),
        self.context.drawer
    )
    local ____self_context_frames_8 = self.context.frames
    ____self_context_frames_8[#____self_context_frames_8 + 1] = frame
    return frame
end
function MonitorFramer.prototype.drawAll(self)
    if #self.context.frames == 0 then
        return
    end
    self:validateMonitor()
    for ____, frame in ipairs(self.context.frames) do
        if frame:needToDraw() then
            frame:draw()
        end
        if #frame:getElements() > 0 then
            frame:drawElements(true)
        end
        frame:markDrawn()
    end
end
function MonitorFramer.prototype.refreshAll(self, deltaTime)
    if #self.context.frames == 0 then
        return
    end
    for ____, frame in ipairs(self.context.frames) do
        do
            local __continue19
            repeat
                if frame:needToDraw() then
                    frame:draw()
                end
                if #frame:getElements() == 0 then
                    __continue19 = true
                    break
                end
                frame:drawElements(false)
                for ____, element in ipairs(frame:getElements()) do
                    element:refresh(frame, deltaTime)
                end
                frame:markDrawn()
                __continue19 = true
            until true
            if not __continue19 then
                break
            end
        end
    end
end
function MonitorFramer.prototype.loop(self)
    self:validateMonitor()
    local lastTime = os.clock()
    while true do
        local currentTime = os.clock()
        local deltaTime = currentTime - lastTime
        lastTime = currentTime
        self:drawAll()
        self:refreshAll(deltaTime)
        os.sleep(1 / self.context.refresh_rate)
    end
end
____exports.Frame = __TS__Class()
local Frame = ____exports.Frame
Frame.name = "Frame"
function Frame.prototype.____constructor(self, context, monitor, drawer)
    self.context = context
    self.monitor = monitor
    self.drawer = drawer
end
function Frame.prototype.draw(self)
    self.drawer:setMonitor(self.monitor)
    local monitorWidth, monitorHeight = self.monitor.getSize()
    local gapX1 = math_utils:clamp(self.context.x - 1, 1, monitorWidth)
    local gapY1 = math_utils:clamp(self.context.y - 1, 1, monitorHeight)
    local gapX2 = math_utils:clamp(self.context.x + self.context.width, 1, monitorWidth)
    local gapY2 = math_utils:clamp(self.context.y + self.context.height, 1, monitorHeight)
    self.drawer:drawFilledRect(
        gapX1,
        gapY1,
        gapX2,
        gapY2,
        self.context.gapColor
    )
    self.drawer:drawBorderedRect(
        self.context.x,
        self.context.y,
        self.context.width - 1,
        self.context.height - 1,
        self.context.borderColor,
        self.context.fillColor
    )
    if self.context.title then
        local oldBackgroundColor = self.monitor.getBackgroundColor()
        local oldTextColor = self.monitor.getTextColor()
        self.monitor.setBackgroundColor(self.context.fillColor)
        self.monitor.setTextColor(self.context.borderColor)
        local title = (" " .. self.context.title) .. " "
        local titleX = self.context.x + math.max(
            1,
            math.floor((self.context.width - #title) / 2)
        )
        self.monitor.setCursorPos(titleX, self.context.y)
        self.monitor.write(title)
        self.monitor.setBackgroundColor(oldBackgroundColor)
        self.monitor.setTextColor(oldTextColor)
    end
end
function Frame.prototype.drawElements(self, forceRedraw)
    for ____, element in ipairs(self.context.elements) do
        if forceRedraw or element.toDraw then
            element:draw(self, self.monitor)
            element.toDraw = false
        end
    end
end
function Frame.prototype.addElement(self, element)
    local ____self_context_elements_9 = self.context.elements
    ____self_context_elements_9[#____self_context_elements_9 + 1] = element
end
function Frame.prototype.removeElement(self, elementId)
    self.context.elements = __TS__ArrayFilter(
        self.context.elements,
        function(____, ____bindingPattern0)
            local id
            id = ____bindingPattern0.id
            return id ~= elementId
        end
    )
end
function Frame.prototype.getElement(self, elementId)
    return __TS__ArrayFind(
        self.context.elements,
        function(____, ____bindingPattern0)
            local id
            id = ____bindingPattern0.id
            return id == elementId
        end
    )
end
function Frame.prototype.needToDraw(self)
    return self.context.toDraw
end
function Frame.prototype.getElements(self)
    return self.context.elements
end
function Frame.prototype.hasElement(self, elementId)
    return __TS__ArraySome(
        self.context.elements,
        function(____, ____bindingPattern0)
            local id
            id = ____bindingPattern0.id
            return id == elementId
        end
    )
end
function Frame.prototype.markDrawn(self)
    self.context.toDraw = false
end
function Frame.prototype.markRedraw(self)
    self.context.toDraw = true
end
function Frame.prototype.getWidth(self)
    return self.context.width
end
function Frame.prototype.getInnerWidth(self)
    return self.context.width - 2
end
function Frame.prototype.getInnerHeight(self)
    return self.context.height - 2
end
function Frame.prototype.toScreenCoords(self, x, y)
    return {x = self.context.x + 1 + x, y = self.context.y + 1 + y}
end
____exports.Element = __TS__Class()
local Element = ____exports.Element
Element.name = "Element"
function Element.prototype.____constructor(self, id)
    self.id = id
    self.toDraw = true
end
return ____exports
