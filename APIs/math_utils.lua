--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.clamp(self, value, min, max)
    return math.min(
        math.max(value, min),
        max
    )
end
function ____exports.lerp(self, start, ____end, amount)
    return start + (____end - start) * amount
end
function ____exports.map(self, value, start1, end1, start2, end2)
    return ____exports.lerp(
        nil,
        start2,
        end2,
        ____exports.clamp(nil, (value - start1) / (end1 - start1), 0, 1)
    )
end
return ____exports
