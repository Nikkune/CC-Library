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
-- End of Lua Library inline imports
local ____exports = {}
local math_utils = require("APIs.math_utils")
____exports.TextAlignment = TextAlignment or ({})
____exports.TextAlignment.NORMAL = 0
____exports.TextAlignment[____exports.TextAlignment.NORMAL] = "NORMAL"
____exports.TextAlignment.CENTER = 1
____exports.TextAlignment[____exports.TextAlignment.CENTER] = "CENTER"
____exports.TextAlignment.HORIZONTAL = 2
____exports.TextAlignment[____exports.TextAlignment.HORIZONTAL] = "HORIZONTAL"
____exports.TextAlignment.VERTICAL = 3
____exports.TextAlignment[____exports.TextAlignment.VERTICAL] = "VERTICAL"
local MONITOR_ERROR = "Monitor not found. Please set it with MonitorDrawer.setMonitor(monitor)"
____exports.MonitorDrawer = __TS__Class()
local MonitorDrawer = ____exports.MonitorDrawer
MonitorDrawer.name = "MonitorDrawer"
function MonitorDrawer.prototype.____constructor(self)
    self.context = {monitor = nil}
end
function MonitorDrawer.getInstance(self)
    if not self.instance then
        self.instance = __TS__New(____exports.MonitorDrawer)
    end
    return self.instance
end
function MonitorDrawer.prototype.setMonitor(self, monitor)
    self.context.monitor = monitor
end
function MonitorDrawer.prototype.validateMonitor(self)
    if not self.context.monitor then
        error(MONITOR_ERROR)
    end
    return self.context.monitor
end
function MonitorDrawer.prototype.calculateBounds(self, x, y, width, height)
    local monitor = self:validateMonitor()
    local monitorWidth, monitorHeight = monitor.getSize()
    return {
        x1 = math_utils:clamp(x, 1, monitorWidth),
        y1 = math_utils:clamp(y, 1, monitorHeight),
        x2 = math_utils:clamp(x + width, 1, monitorWidth),
        y2 = math_utils:clamp(y + height, 1, monitorHeight)
    }
end
function MonitorDrawer.prototype.withPreservedColor(self, monitor, action)
    local oldBackgroundColor = monitor.getBackgroundColor()
    action(nil)
    monitor.setBackgroundColor(oldBackgroundColor)
end
function MonitorDrawer.prototype.writeTextToMonitor(self, x, y, text, textColor, backgroundColor)
    local monitor = self:validateMonitor()
    monitor.setBackgroundColor(backgroundColor)
    monitor.setTextColor(textColor)
    monitor.setCursorPos(x, y)
    monitor.write(text)
end
function MonitorDrawer.prototype.drawFilledRect(self, x, y, width, height, color)
    local monitor = self:validateMonitor()
    local bounds = self:calculateBounds(x, y, width, height)
    if bounds.x1 > bounds.x2 or bounds.y1 > bounds.y2 then
        return
    end
    self:withPreservedColor(
        monitor,
        function()
            monitor.setBackgroundColor(color)
            do
                local yy = bounds.y1
                while yy < bounds.y2 do
                    monitor.setCursorPos(x, yy)
                    monitor.write(string.rep(" ", bounds.x2 - bounds.x1 + 1))
                    yy = yy + 1
                end
            end
        end
    )
end
function MonitorDrawer.prototype.drawBorderedRect(self, x, y, width, height, borderColor, backgroundColor)
    local monitor = self:validateMonitor()
    local bounds = self:calculateBounds(x, y, width, height)
    self:withPreservedColor(
        monitor,
        function()
            monitor.setCursorPos(bounds.x1, bounds.y1)
            monitor.setBackgroundColor(borderColor)
            monitor.write(string.rep(
                " ",
                math.floor(bounds.x2 - bounds.x1 + 1)
            ))
            do
                local yy = bounds.y1 + 1
                while yy <= bounds.y2 - 1 do
                    monitor.setCursorPos(bounds.x1, yy)
                    monitor.setBackgroundColor(borderColor)
                    monitor.write(" ")
                    if bounds.x2 > bounds.x1 + 1 then
                        monitor.setBackgroundColor(backgroundColor)
                        monitor.write(string.rep(
                            " ",
                            math.floor(bounds.x2 - bounds.x1 - 1)
                        ))
                    end
                    if bounds.x2 > bounds.x1 then
                        monitor.setBackgroundColor(borderColor)
                        monitor.write(" ")
                    end
                    yy = yy + 1
                end
            end
            if bounds.y2 > bounds.y1 then
                monitor.setCursorPos(bounds.x1, bounds.y2)
                monitor.setBackgroundColor(borderColor)
                monitor.write(string.rep(
                    " ",
                    math.floor(bounds.x2 - bounds.x1 + 1)
                ))
            end
        end
    )
end
function MonitorDrawer.prototype.drawText(self, params)
    local textColor = params.textColor or colors.white
    local backgroundColor = params.backgroundColor or colors.black
    if params.alignment == ____exports.TextAlignment.NORMAL then
        self:writeTextToMonitor(
            params.x1,
            params.y1,
            params.text,
            textColor,
            backgroundColor
        )
        return
    end
    local bounds = self:calculateBounds(params.x1, params.y1, (params.x2 or params.x1) - params.x1, (params.y2 or params.y1) - params.y1)
    local x = params.x1
    local y = params.y1
    if params.alignment == ____exports.TextAlignment.CENTER or params.alignment == ____exports.TextAlignment.HORIZONTAL then
        x = math_utils:lerp(bounds.x1, bounds.x2, 0.5)
        x = x - math.floor(#params.text / 2)
    end
    if params.alignment == ____exports.TextAlignment.CENTER or params.alignment == ____exports.TextAlignment.VERTICAL then
        y = math_utils:lerp(bounds.y1, bounds.y2, 0.5)
    end
    self:writeTextToMonitor(
        x,
        y,
        params.text,
        textColor,
        backgroundColor
    )
end
return ____exports
