--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
--- -------------------- TYPES & ENUMS -------------------- *
____exports.GatewayStatus = GatewayStatus or ({})
____exports.GatewayStatus.OK = "OK"
____exports.GatewayStatus.WARNING = "WARNING"
____exports.GatewayStatus.ERROR = "ERROR"
____exports.GatewayStatus.MAINTENANCE = "MAINTENANCE"
____exports.GatewayStatus.LOST = "LOST"
--- -------------------- CONFIGURATION -------------------- *
local CONFIG = {PERIPHERALS = {MODEM_SIDE = "left", DATACENTER_ID = 4}}
function ____exports.send(self, gatewayName, status, message)
    if message == nil then
        message = ""
    end
    rednet.send(CONFIG.PERIPHERALS.DATACENTER_ID, {type = "status_update", name = gatewayName, status = status, message = message})
end
return ____exports
