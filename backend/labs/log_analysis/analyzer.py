import re
from collections import Counter

def analyze_logs(content):
    lines = content.split("\n")

    failed = []
    warnings = []
    errors = []
    ip_list = []

    ip_pattern = r"(?:\d{1,3}\.){3}\d{1,3}"

    for line in lines:
        if "Failed" in line or "failed" in line:
            failed.append(line)

        if "WARNING" in line or "Warning" in line:
            warnings.append(line)

        if "ERROR" in line or "Error" in line:
            errors.append(line)

        ips = re.findall(ip_pattern, line)
        ip_list.extend(ips)

    return {
        "total_lines": len(lines),
        "failed_attempts": len(failed),
        "warnings": len(warnings),
        "errors": len(errors),
        "top_ips": Counter(ip_list).most_common(5),
        "raw": content
    }


# Challenge Helpers
def get_challenge(data, cid):
    return data["log_analysis"].get(cid)


def validate_answers(user_answers, expected):
    result = {}

    for key, correct_value in expected.items():
        user_value = user_answers.get(key, "")

        # Normalize input
        user_value = str(user_value).strip().lower()
        correct_value = str(correct_value).strip().lower()

        result[key] = (user_value == correct_value)

    score = sum(result.values())

    return {
        "details": result,
        "score": score,
        "total": len(expected),
        "passed": (score == len(expected))
    }

